import helpers from '../utils/helpers';
import { onSuccess, onError } from '../utils/response';
import travel from '../models/travel'
import coordinates from '../models/coordinates';
import battery from '../models/battery';
import sequelize, {Op} from 'sequelize'
import distance from 'gps-distance';
import motobike from '../models/motobike';


class TravelController {
    static async createTravel(req, res) {

        // This method creates a new travel record which will be used to record the coordinates of the moto when travelling
        // body: motobike_id, battery_id, battery_power_start

        const { motobike_id, battery_id, battery_power_start } = req.body;
        try {

            const checkBattery = await battery.findOne({ where: { id: battery_id, battery_status : 'available' } });

            if (!checkBattery) {
                return onError(res, 404, "Battery not found");
            }

            const checkTravel = await travel.findOne({ where: { battery_id: battery_id, status: { [Op.not]: 'stopped' } } });
            
            if (checkTravel) { 
                return onError(res, 404, "Multiple travel active not allowed");
            }

            const createTravel = await travel.create({ battery_id, motorbike_id : motobike_id, battery_power_start, status: 'New' })

            return onSuccess(res, 201, "Travel created", createTravel.toJSON())

        } catch (error) {
            return onError(res, 500, "Internal server error" + error)
        }
    }
    

    static async startTravel(req, res) {

        //  This method is used to start a travel recording which a motorbike has a battery attached to it

        try {
            const { batterserialnumber } = req.params

            const checkBattery = await battery.findOne({ where: { serial_number: batterserialnumber } });

            if (!checkBattery) { 
                return onError(res, 404, "Battery not found");
            }

            const checkTravel = await travel.findOne({ where: { battery_id: checkBattery.id, status: 'new' } });

            if (!checkTravel) { 
                return onError(res, 404, "Travel not found");
            }

            await checkTravel.update({ status: 'started', start_time: Date.now() });            
            await checkBattery.update({ battery_status 	: 'motion' });

            return onSuccess(res, 201, "Trave Startded", checkTravel.toJSON())

        } catch (err) {
            return onError(res, 500, "Internal server error" + err)
        }
    }

    static async track(req, res) {
        // this method is used to track the motobike which is travelling by sending the coordinates of the motobike to the server
        // Note that battery serial number is the source of information
        // params: batterieserialnumber

        try {

            const { batterserialnumber } = req.params;

            const { latitude, longitude } = req.body;

            const checkBattery = await battery.findOne({ where: { serial_number: batterserialnumber } });

            if (!checkBattery) {
                return onError(res, 404, "Battery not found");
            }
            const checkTravel = await travel.findOne({ where: { battery_id: checkBattery.id } });
            
            if (!checkTravel) {
                return onError(res, 404, "Travel not found");
            }

            if (checkTravel.status != 'started') {
                return onError(res, 400, "Travel Not started")
            }

            const data = {
                latitude,
                longitude,
                travel_id: checkTravel.id,
            }

            const track = await coordinates.create(data);

            return onSuccess(res, 201, "Record created", track.toJSON())

        } catch (error) {
           return onError(res, 500, "Internal server error", error)
        }
    }

    static async StopTravel(req, res) {

        // this method is used to stop a travel recording when the motorbike is going to change battery
        // Note that battery serial number is the source of information
        // params: batterieserialnumber
        // body: battery_power_end

        try {
            const { batterserialnumber } = req.params;

            const { battery_percentage } = req.body;

            const checkBattery = await battery.findOne({ where: { serial_number: batterserialnumber } });

            if (!checkBattery) {
                return onError(res, 404, "Battery not found");
            }

            const checkTravel = await travel.findOne({
                where: {
                    battery_id: checkBattery.id,
                    // status: 'started'
                }
            });

            if (!checkTravel) {
                return onError(res, 404, "Travel not found");
            }

            
            await battery.update({ status: 'idle' }, { where: { id: checkBattery.id } });
            
            const getAllCoordinates = await coordinates.findAll({ where: { travel_id: checkTravel.id }, attributes: ['latitude', 'longitude'] ,  raw: true,   nest: true, });
            
            const distanceTravelled = distance(getAllCoordinates.map(({ latitude, longitude }) => [latitude, longitude]))

            const updated = await checkTravel.update({ status: 'stopped', end_time: Date.now(), battery_power_end: battery_percentage, distance: distanceTravelled }, { where: { battery_id: checkBattery.id, status: 'started' } });
            
            const battery_used = (checkBattery.max_power - battery_percentage) / checkBattery.max_power * 100;

            return onSuccess(res, 201,
                "Travel stopped", {
                    ...updated.toJSON(),
                    start_time: new Date(updated.start_time).toISOString(),
                    end_time: new Date(updated.end_time).toISOString(),
                    travelled: `distance travelled ${Number(distanceTravelled).toFixed(3)} KM`,
                    battery_percentage: `battery percentage used ${battery_used}%`
            })
            
        } catch (error) {
            return onError(res, 500, "Internal server error" + error)
        }
    }

    static async getAllBatteryInMotion(req, res) {

        // this method returns all batterys which are in circulation
        try {

            const allBattery = await battery.findAll({ where: { status: 'motion' } });

            return onSuccess(res, 200, "All battery in motion", allBattery)
            
        } catch (error) {
            return onError(res, 500, "Internal server error", error)
        }
    }

    static async getAllBatteryInIdle(req, res) {
        try {
            const allBattery = await battery.findAll({ where: { status: 'idle' } });
            return onSuccess(res, 200, "All battery in idle", allBattery)
        } catch (error) {
            return onError(res, 500, "Internal server error", error)
        }
    }

    static async getAllTravelStarted(req, res) { 

        // this method returns all motorbite in circulation

        try {
            const allTravel = await travel.findAll({ where: { status: 'started' } });
            return onSuccess(res, 200, "All travel started", allTravel)
        } catch (error) {
            return onError(res, 500, "Internal server error", error)
        }
    }

    static async distanceTravelled(req, res) { 
        // this method returns all motorbite and their distance travelled

        try {

            const { motoid } = req.params

            if (!motoid) {
                const allDrives = await motobike.findAll({ attributes: ['id', 'driver_name'], raw: true, nest: true });

                const data = Promise.all(allDrives.map(async ({ id, driver_name }) => {
                    const travels = await travel.findAll({ where: { motorbike_id: id }, attributes: [[sequelize.fn('sum', sequelize.col('distance')), 'total_distance']], raw: true });
                    console.log(travels[0]);
                    return {
                        'driver_name': driver_name,
                        'total_distance': travels[0].total_distance
                    };
                }));

                return onSuccess(res, 200, "All distance travelled", data)
            }
                        
        } catch (error) {
            console.log(error);
            return onError(res, 500, "Internal server error" + error)
        }

    }
}


export default TravelController;
