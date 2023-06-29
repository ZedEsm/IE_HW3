import express from "express";
import StudentController from "../../controllers/admin/student.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();


router
    .route("/student/:id")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManager],
        StudentController.getStudentById
    )

router
    .route("/students")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManager],
        StudentController.getAllStudents
    );

// router
//     .route("/course/preregister/:id")
//     .post(
//         [Auth.isAuthenticated,RoleHandler.isStudent],
//         StudentController.preregisterDemandById
//
//     );

router
    .route("/course/preregister/:id")
    .post(
        [Auth.isAuthenticated,RoleHandler.isStudent],
        StudentController.preregisterCourseInSpecifiedTerm

    );
// router
//     .route("/course/preregister")
//     .post(
//         [Auth.isAuthenticated,RoleHandler.isStudent],
//         StudentController.preregisterDemand
//
//     );

router
    .route("/course/preregister/:id/:course_id")
    .delete(
        [Auth.isAuthenticated,RoleHandler.isStudent],
        StudentController.deletePreregisterDemand
    );




router
    .route("/course/:id/preregistrations")
    .get(
        [Auth.isAuthenticated,RoleHandler.isManagerOrStudent],
        StudentController.getPreregistration
    );

router
    .route("/course/register/:id")
    .post(
        [Auth.isAuthenticated,RoleHandler.isStudent],
        StudentController.registerDemand

    );

// router
//     .route("/course/register/:id")
//     .post(
//         [Auth.isAuthenticated,RoleHandler.isStudent],
//         StudentController.registerCourseById
//
//     );

router
    .route("/course/register/:id")
    .delete(
        [Auth.isAuthenticated,RoleHandler.isStudent],
        StudentController.deleteRegisteredCourse
    );
export default router;

