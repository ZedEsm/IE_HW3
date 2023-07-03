export default (mongoose) => mongoose.model(
    "term",
    mongoose.Schema({
        name: String,
        user_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BaseUserSchema',
        }],
        semester_courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'semesterCourses',
        }],
        preregistration_semester_course: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'semesterCourses',//TODO type
        }],
        registration_semester_course: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'semesterCourses',
        }],

    })
)