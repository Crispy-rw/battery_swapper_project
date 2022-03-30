import helpers from '../utils/helpers';
import { onSuccess, onError } from '../utils/response';
import motobike from '../models/motobike';

class MotoBikeController {
    static async addMoto(req, res) {

        // This method is used to  add a new motobike
        // body: platenumber, driver_name

        const { platenumber, driver_name } = req.body;

        try { 

            const checkBike = await motobike.findOne({ where: { platenumber } });

            if(!checkBike) {
                return res.status(201).json({
                    status: 201,
                    message: 'MotoBike added successfully',
                    data: await motobike.create({ platenumber })
                });
            }

            return res.status(400).json({
                status: 400,
                message: 'MotoBike already exists',
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error' + error,
            });
        }
    }
}


export default MotoBikeController;
