import Joi from "joi";

const baseCoreCourseOption = {
    discriminator: "courses",
    collection: "courses",
    timestamps: true
};

export default (mongoose) =>
    mongoose.models.courses ||
    mongoose.model(
        "courses",
        mongoose.Schema(
            {
                courseName: {
                    type: String,
                    trim: true,
                    unique: true,
                },

                field: Joi
                    .string()
                    .trim()
                    .required()
                    .valid("Literature", "CE", "Computer Engineering", "Pharmacy", "Mathematics",
                        "Physics", "Music", "Agricultural Chemistry", "Biology"),

                prerequisites: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "courses",
                        default: []
                    },
                ],
                corequisites: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "courses",
                        default: []
                    },
                ],
                unit: Joi
                    .number()
                    .min(0)
                    .max(4)
                    .required(),
            },
            baseCoreCourseOption
        )
    );
