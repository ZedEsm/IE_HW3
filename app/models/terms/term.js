import mongoose from "mongoose";

export default (mongoose) => mongoose.model(
    "term",
    mongoose.Schema({
        name:String,
        user_id: {
            type: Number,
            unique: true,
            required: true,
            index: true
        },
        semester_courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'semesterCourses',
        }],
    })
)