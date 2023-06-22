import { hash } from "bcrypt";

import db from "../models/index.js";
import createResponse from "../utils/create-response.js";
import existAllParams from "../utils/exist-all-params.js";

const Admin = db.itManagers;
const Role = db.roles;
const ROLES = db.ROLES;

const requiredAdminParams = [
    "full_name",
    "user_id",
    "password",
    "email",
    "phone",
];

export default class AdminController {
    static async create(req, res) {
        if (!existAllParams(requiredAdminParams, req.body)) {
            return res
                .status(400)
                .json(createResponse(true, "Content is incomplete!"));
        }
        // Save Student in the database
        try {
            const { full_name, user_id, password, email, phone } = req.body;
            const password_hash = await hash(password, 10); // hash the password with salt round 10

            const role = await Role.findOne({ name: ROLES[0] });

            const admin = new Admin({
                full_name,
                user_id,
                password_hash,
                email,
                phone,
                role,
            });
            const data = await admin.save(admin);
            res.status(201).json(
                createResponse(true, "Admin Created Successfully!", data)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while creating the Admin."
                )
            );
        }
    }

    static async delete(req, res) {
        const id = req.params.id;
        try {
            const data = await Admin.findByIdAndRemove(id);
            if (data)
                return res
                    .status(200)
                    .json(createResponse(true, "Admin Deleted Successfully"));
            return res
                .status(404)
                .json(createResponse(false, "Admin not found"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while deleting the Admin."
                )
            );
        }
    }
}
