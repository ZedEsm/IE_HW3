import express from "express";
import RoleController from "../../controllers/admin/role.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();

router
    .route("/admin/roles")
    .post(RoleController.create);

router
    .route("/admin/roles/:id")
    .put([Auth.isAuthenticated, RoleHandler.isAdmin], RoleController.update)
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        RoleController.getRoleById
    )
    .delete([Auth.isAuthenticated, RoleHandler.isAdmin], RoleController.delete);

router
    .route("/admin/roles")
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        RoleController.getAllRoles
    );

export default router;
