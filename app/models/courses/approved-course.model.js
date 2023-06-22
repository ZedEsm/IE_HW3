import BaseCourseModel from "./_core-course.model.js";

export default (mongoose) =>
    BaseCourseModel(mongoose).discriminator(
        "approvedCourses",
        mongoose.Schema({})
    );
