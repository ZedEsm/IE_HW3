import BaseUserSchema from "./_core-user.model.js";
import Joi from "joi";

export default (mongoose) =>
    BaseUserSchema(mongoose).discriminator(
        "professors",
        mongoose.Schema({
            college: Joi.string()
                .lowercase()
                .trim()
                .required(),

            field: Joi.string()
                .lowercase()
                .trim()
                .required()
                .valid("Literature", "CE", "Computer Engineering", "Pharmacy", "Mathematics",
                    "Physics", "Music", "Agricultural Chemistry", "Biology"),

            rank: Joi.string()
                .trim()
                .lowercase()
                .required()
                .valid("Instructor", "Assistant",
                    "Associate", "Professor"),

            courses: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'courses',
            }],

        })
    );
