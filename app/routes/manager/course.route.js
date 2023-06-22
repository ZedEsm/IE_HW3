import express from "express";
import CourseController from "../../controllers/course.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();

router
    .route("/courses")
    .post(
        [Auth.isAuthenticated, RoleHandler.isManager],
        CourseController.create
    );

router
    .route("/courses/:id")
    .put([Auth.isAuthenticated, RoleHandler.isManager], CourseController.update)

    .delete(
        [Auth.isAuthenticated, RoleHandler.isManager],
        CourseController.delete
    );

export default router;
