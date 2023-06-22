import jwt from "jsonwebtoken";

import db from "../models/index.js";
import { compare } from "bcrypt";
import createResponse from "../utils/create-response.js";
import existAllParams from "../utils/exist-all-params.js";

const users = db.users;
const requiredLoginParams = ["user_id", "password"];
export default class LoginController {
    static async login(req, res) {
        if (!existAllParams(requiredLoginParams, req.body))
            return res
                .status(400)
                .json(createResponse(false, "Content is incomplete!"));

        const user_id = req.body.user_id;
        const password = String(req.body.password);

        const user = await users.findOne({ user_id: user_id });
        if (!user)
            return res
                .status(404)
                .json(
                    createResponse(false, `User with id ${user_id} not found`)
                );

        const success = await compare(password, user.password_hash);
        if (!success)
            return res
                .status(400)
                .json(createResponse(false, `password is not correct`));

        const fullName = user.full_name;
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: 259200, // 3 day
            }
        );
        return res.status(200).json(
            createResponse(true, `User Logged in`, {
                fullName,
                accessToken,
            })
        );
    }
}
