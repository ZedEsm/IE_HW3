import db from "../models/index.js";
import createResponse from "../utils/create-response.js";

const ROLES = db.ROLES;

export default class RoleHandler {
    static async isAdmin(req, res, next) {
        if (req.user_role !== ROLES[0])
            return res
                .status(403)
                .json(createResponse(false, "access denied!"));
        next();
    }

    static async isManager(req, res, next) {
        if (req.user_role !== ROLES[1])
            return res
                .status(403)
                .json(createResponse(false, "access denied!"));
        next();
    }

    static async isProfessor(req, res, next) {
        if (req.user_role !== ROLES[2])
            return res
                .status(403)
                .json(createResponse(false, "access denied!"));
        next();
    }

    static async isStudent(req, res, next) {
        if (req.user_role !== ROLES[3])
            return res
                .status(403)
                .json(createResponse(false, "access denied!"));
        next();
    }

    static async isManagerOrStudentOrProfessor(req, res, next){

        if (req.user_role !== ROLES[1] && req.user_role !== ROLES[2] && req.user_role !== ROLES[3])
            return res
                .status(403)
                .json(createResponse(false, "access denied!"));
        next();
    }
}
