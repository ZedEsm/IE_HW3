import Course from "./_core-course.model.js";
import Joi from "joi";

export default (mongoose) =>
    Course(mongoose).discriminator(
        "semesterCourses",
        mongoose.Schema({
            classDate: Joi.date()
                .default(Date.now),

            examDate: Joi.date()
                .default(Date.now),

            examLocation: Joi.string()
                .trim()
                .required(),

            courseProfessor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "professors",
            },
            capacity: Joi
                .number()
                .min(0)
                .max(200)
                .required(),

            educationSemester: Joi
                .string()
                .trim()
        })
    );
