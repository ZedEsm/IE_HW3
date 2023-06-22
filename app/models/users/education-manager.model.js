import BaseUserSchema from "./_core-user.model.js";
import Joi from "joi";

export default (mongoose) =>
    BaseUserSchema(mongoose).discriminator(
        "educationManagers",
        mongoose.Schema({
            college: Joi.string()
                .trim()
                .lowercase()
        })
    );
