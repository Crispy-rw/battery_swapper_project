import joi from "joi";
import { onError, onServerError } from "../utils/response";

class SubscriptionValidations {
  addUser(req, res, next) {
    try {
      const validateSchema = joi.object({
        name: joi.number().required("Name is required"),
      });
      const { error } = validateSchema.validate(req.body);
      if (error)
        return onError(res, 400, error.details[0].message.split('"').join(""));
      return next();
    } catch (err) {
      return onServerError(res, err);
    }
  }

  addSubscription(req, res, next) {
    try {
      const validateSchema = joi.object({
        userId: joi.number().required("UserId is required"),
        subs_plan_type: joi.string().valid('Basic', 'Premium').required("Plan Type required"),
        start_date: joi.date().required("Start Date is required"),
        end_date: joi.date().required("End Date is required"),
        source_type: joi.string().valid('IP', 'USERID').required("Source type is required"),
        source: joi.string().required("Source is required"),
      });
      const { error } = validateSchema.validate(req.body);
      if (error)
        return onError(res, 400, error.details[0].message.split('"').join(""));
      return next();
    } catch (err) {
      return onServerError(res, err);
    }
   }

}

export default new SubscriptionValidations();
