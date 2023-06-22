import Joi from "joi";
import BaseUserSchema from "./_core-user.model.js";

export default (mongoose) =>
    BaseUserSchema(mongoose).discriminator(
        "students",
        mongoose.Schema({
            degree: Joi
                .string()
                .trim()
                .lowercase()
                .required()
                .valid("associate", "bachelor", "master", "doctoral", "professional"),

            incomingYear: Joi.number()
                .min(1330)
                .max(new Date().getFullYear())
                .default(new Date().getFullYear()),

            incomingSemester: Joi.number()
                .min(1330)
                .max(new Date().getFullYear())
                .default(new Date().getFullYear()),

            gradeAverage: Joi.number()
                .min(0)
                .max(20),

            college: Joi
                .string()
                .trim()
                .required(),

            field: Joi
                .string()
                .trim()
                .valid("Literature", "CE", "Computer Engineering", "Pharmacy", "Mathematics",
                "Physics", "Music", "Agricultural Chemistry", "Biology"),

            courses: [{
               type: mongoose.Schema.Types.ObjectId,
               ref: 'courses',
            }],
        })
    );
