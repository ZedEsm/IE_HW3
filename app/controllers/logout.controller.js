// import jwt from "jsonwebtoken";
//
// import db from "../models/index.js";
// import {compare} from "bcrypt";
// import createResponse from "../utils/create-response.js";
// import existAllParams from "../utils/exist-all-params.js";
// import revokedTokens from "lodash";
//
// const users = db.users;
// const requiredLoginParams = ["user_id", "password"];
// export default class LogOutController {
//     static async logout(req, res) {
//         const token = req.headers.authorization;
//
//         if (!token)
//             return res.status(401).json(createResponse(false, "No token provided"));
//
//         try {
//                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//             const userId = decodedToken.id;
// d
//             if (revokedTokens.has(token))
//                 return res.status(401).json(createResponse(false, "Token has already been revoked"));
//             const user = await users.findById(userId);
//
//             if (!user)
//                 return res.status(404).json(createResponse(false, "User not found"));
//
//             revokedTokens.add(token);
//             user.token = null;
//             await user.save();
//
//             return res.status(200).json(createResponse(true, "Logout successful"));
//         } catch (error) {
//             console.error("An error occurred while logging out:", error);
//             return res.status(500).json(createResponse(false, "Internal Server Error"));
//         }
//     }
//
//
// }
