import mongoose from "mongoose";

export default (mongoose) => mongoose.model ("preregistration",{
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'semesterCourses',
    }],
})