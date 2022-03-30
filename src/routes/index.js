import express from "express";
import TravelController from '../controllers/TravelController'
import MotoBikeController from '../controllers/MotoBikeController'
import BatteryController from '../controllers/BatteryController'


const routes = express.Router();

routes.post("/addbattery", BatteryController.addBattery);

routes.post("/addmotorbike", MotoBikeController.addMoto);

routes.post("/createtravel", TravelController.createTravel);

routes.post("/starttravel/:batterserialnumber", TravelController.startTravel);

routes.post("/stoptravel/:batterserialnumber", TravelController.StopTravel);

routes.post('/track/:batterserialnumber', TravelController.track)

routes.get('/distancetravelled', TravelController.distanceTravelled)




export default routes;
