import helpers from '../utils/helpers';
import { onSuccess, onError } from '../utils/response';
import battery from '../models/battery';

class BatteryController {
    
    static async addBattery(req, res) {        

        // This method is used to  add a new battery
        // Body: serial_number, max_power

        try { 
            const { serial_number, max_power } = req.body;
            const checkBattery = await battery.findOne({ where: { serial_number } });

            if (!checkBattery) {
                return onSuccess(res, 201, "Battery added successfully", await battery.create({ serial_number, max_power }));
            }

            return res.status(400).json({
                status: 400,
                message: 'Battery Serial already exists',
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error' + error,
            });
        }
    }
}


export default BatteryController;
