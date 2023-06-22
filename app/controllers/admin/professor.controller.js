import { hash } from "bcrypt";

import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";
import existAllParams from "../../utils/exist-all-params.js";

const Professor = db.professors;
const Role = db.roles;
const ROLES = db.ROLES;

const requiredProfessorParams = [
    "full_name",
    "user_id",
    "password",
    "email",
    "phone",
    "college",
    "field",
    "rank",
];

export default class ProfessorController {
    static async create(req, res) {
        if (!existAllParams(requiredProfessorParams, req.body)) {
            return res
                .status(400)
                .json(createResponse(true, "Content is incomplete!"));
        }
        // Save Professor in the database
        try {
            const {
                full_name,
                user_id,
                password,
                email,
                phone,
                college,
                field,
                rank,
            } = req.body;
            const password_hash = await hash(password, 10); // hash the password with salt round 10

            const role = await Role.findOne({ name: ROLES[2] });

            const professor = new Professor({
                full_name,
                user_id,
                password_hash,
                email,
                phone,
                college,
                field,
                rank,
                role,
            });
            const data = await professor.save(professor);
            res.status(201).json(
                createResponse(true, "Professor Created Successfully !", data)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while creating the Professor."
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

            const {
                full_name,
                user_id,
                password,
                email,
                phone,
                college,
                field,
                rank
            } = req.body;

            let password_hash;
            if (password)
                 password_hash = await hash(password, 10); // hash the password with salt round 10


            const professor = {
                full_name,
                user_id,
                password_hash,
                email,
                phone,
                college,
                field,
                rank,
            }

            const data = await Professor.findByIdAndUpdate(id, professor, {
                useFindAndModify: true,
            });
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(true, "Professor Updated Successfully")
                    );
            return res
                .status(404)
                .json(createResponse(false, "Professor not found"));
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message ||
                        "Some error occurred while updating the Professor.")
                );
        }
    }

    static async delete(req, res) {
        const id = req.params.id;
        try {
            const data = await Professor.findByIdAndRemove(id);
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(true, "Professor Deleted Successfully")
                    );
            return res
                .status(404)
                .json(createResponse(false, "Professor not found"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while deleting the Professor."
                )
            );
        }
    }
    static async getAllProfessors(req, res) {
        try {
            const data = await Professor.find().populate('role');
            return res
                .status(200)
                .json(createResponse(true, "get all professors", data));
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get all Professors.`
                    )
                );
        }
    }
    static async getProfessorById(req, res) {
        const id = req.params.id;
        try {
            const data = await Professor.findById(id).populate('role');
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(
                            true,
                            `get Professor with id ${id}.`,
                            data
                        )
                    );
            return res
                .status(404)
                .json(
                    createResponse(false, `Professor with id ${id} not found.`)
                );
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get the Professor.`
                    )
                );
        }
    }
}
