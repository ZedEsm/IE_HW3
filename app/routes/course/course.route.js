import express from "express";
import CourseController from "../../controllers/course.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();

router
    .route("/courses")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManagerOrStudentOrProfessor],
        CourseController.getAllCourses
    );

router
    .route("/courses/:id")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManagerOrStudentOrProfessor],
        CourseController.getCourseById
    )

export default router;