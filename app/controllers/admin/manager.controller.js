import { hash } from "bcrypt";

import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";
import existAllParams from "../../utils/exist-all-params.js";

const EducationManager = db.educationManagers;
const Role = db.roles;
const ROLES = db.ROLES;

const requiredEducationManagerParams = [
    "full_name",
    "user_id",
    "password",
    "email",
    "phone",
    "college",
];

export default class EducationController {
    static async create(req, res) {
        if (!existAllParams(requiredEducationManagerParams, req.body)) {
                res
                .status(400)
                .json(createResponse(true, "Content is incomplete!"));
            return;
        }
        // Save Education Manager in the database
        try {
            const { full_name, user_id, password, email, phone, college } =
                req.body;
            const password_hash = await hash(password, 10); // hash the password with salt round 10

            const role = await Role.findOne({ name: ROLES[1] });

            const educationManager = new EducationManager({
                full_name,
                user_id,
                password_hash,
                email,
                phone,
                college,
                role,
            });
            const data = await educationManager.save(educationManager);
            res.status(201).json(
                createResponse(
                    true,
                    "Education Manager Created Successfully!",
                    data
                )
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while creating the Education Manager."
                )
            );
        }
    }

    static async update(req, res) {
        if (!Object.keys(req.body).length) {
            return res
                .status(400)
                .json(createResponse(false, "Content can not be empty!"));
        }
        try {
            const id = req.params.id;
            const data = await EducationManager.findByIdAndUpdate(
                id,
                req.body,
                { useFindAndModify: true }
            );
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(
                            true,
                            "Education Manager Updated Successfully"
                        )
                    );
            return res
                .status(404)
                .json(createResponse(false, "Education Manager not found"));
        } catch (err) {
            return res
                .status(500)
                .json(
                    false,
                    err.message ||
                        "Some error occurred while updating the Education Manager."
                );
        }
    }

    static async delete(req, res) {
        const id = req.params.id;
        try {
            const data = await EducationManager.findByIdAndRemove(id);
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(
                            true,
                            "Education Manager Deleted Successfully"
                        )
                    );
            return res
                .status(404)
                .json(createResponse(false, "Education Manager not found"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while deleting the Education Manager."
                )
            );
        }
    }
    static async getAllEducationManagers(req, res) {
        try {
            const data = await EducationManager.find().populate('role');
            return res
                .status(200)
                .json(createResponse(true, "get all Education Managers", data));
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get all Education Managers.`
                    )
                );
        }
    }
    static async getEducationManagerById(req, res) {
        const id = req.params.id;
        try {
            const data = await EducationManager.findById(id).populate('role');
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(
                            true,
                            `get Education Manager with id ${id}.`,
                            data
                        )
                    );
            return res
                .status(404)
                .json(
                    createResponse(
                        false,
                        `Education Manager with id ${id} not found.`
                    )
                );
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get the Education Manager.`
                    )
                );
        }
    }
}
