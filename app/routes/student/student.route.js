import express from "express";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";
import StudentUpdateController from "../../controllers/student/update.controller.js";

const router = express.Router();

router
    .route("/student/:id")
    .put(
        [Auth.isAuthenticated, RoleHandler.isStudent],
        StudentUpdateController.update
    );


export default router;
