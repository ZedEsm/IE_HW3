import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";
import existAllParams from "../../utils/exist-all-params.js";

const Role = db.roles;
const requiredRoleParams = ["name"];

export default class RoleController {
    static async create(req, res) {
        if (!existAllParams(requiredRoleParams, req.body)) {
            return res
                .status(400)
                .json(createResponse(true, "Content is incomplete!"));
        }
        // Save Student in the database
        try {
            const { name } = req.body;
            const role = new Role({ name });
            const data = await role.save(role);
            res.status(201).json(
                createResponse(true, "Role Created Successfully!", data)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while creating the Role."
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
            const data = await Role.findByIdAndUpdate(id, req.body, {
                useFindAndModify: true,
            });
            if (data)
                return res
                    .status(200)
                    .json(createResponse(true, "Role Updated Successfully"));
            return res
                .status(404)
                .json(createResponse(false, "Role not found"));
        } catch (err) {
            return res
                .status(500)
                .json(
                    false,
                    err.message ||
                        "Some error occurred while updating the Role."
                );
        }
    }

    static async delete(req, res) {
        const id = req.params.id;
        try {
            const data = await Role.findByIdAndRemove(id);
            if (data)
                return res
                    .status(200)
                    .json(createResponse(true, "Role Deleted Successfully"));
            return res
                .status(404)
                .json(createResponse(false, "Role not found"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while deleting the Role."
                )
            );
        }
    }
    static async getAllRoles(req, res) {
        try {
            const data = await Role.find();
            return res
                .status(200)
                .json(createResponse(true, "get all roles", data));
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get all Roles.`
                    )
                );
        }
    }
    static async getRoleById(req, res) {
        const id = req.params.id;
        try {
            const data = await Role.findById(id);
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(true, `get Role with id ${id}.`, data)
                    );
            return res
                .status(404)
                .json(createResponse(false, `Role with id ${id} not found.`));
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get the Role.`
                    )
                );
        }
    }
}
