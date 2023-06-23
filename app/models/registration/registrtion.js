export default (mongoose) => mongoose.model("registration", {
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'semesterCourses',
    }],
})