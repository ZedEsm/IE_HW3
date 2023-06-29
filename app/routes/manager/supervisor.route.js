// import Auth from "../../middlewares/authentication.js";
// import RoleHandler from "../../middlewares/role.handler.js";
// import visor from "../../controllers/admin/super.controller.js";
// import express from "express";
//
// const router = express.Router();
//
// router
//     .route("/course/:id/registrations")
//     .get(
//         [Auth.isAuthenticated,RoleHandler.isSupervisor],
//         visor.getRegistrations
//     );
// export default router;