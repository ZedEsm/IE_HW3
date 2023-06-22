import mongoose from "mongoose";

import config from "../config/db.config.js";
import students from "./users/student.model.js";
import professors from "./users/professor.model.js";
import semesterCourses from "./courses/semester-course.model.js";
import itManagers from "./users/it-manager.model.js";
import users from "./users/_core-user.model.js";
import courses from "./courses/_core-course.model.js";
import educationManagers from "./users/education-manager.model.js";
import approvedCourses from "./courses/approved-course.model.js";
import roles from "./roles/role.model.js";

// config the database
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = config.url;

// entities (dependency injection)
// users
db.users = users(mongoose);
db.courses = courses(mongoose);
db.students = students(mongoose);
db.professors = professors(mongoose);
db.itManagers = itManagers(mongoose);
db.educationManagers = educationManagers(mongoose);

// courses
db.courses = courses(mongoose);
db.approvedCourses = approvedCourses(mongoose);
db.semesterCourses = semesterCourses(mongoose);

// roles
db.roles = roles(mongoose);
db.ROLES = ["admin", "edu_manager", "professor", "student"];
export default db;
