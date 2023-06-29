import {hash} from "bcrypt";

import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";
import existAllParams from "../../utils/exist-all-params.js";

const SUPER = db.supervisor;
const Role = db.roles;
const ROLES = db.ROLES;
const REGISTER = db.registration;

const requiredSuperParams = [
    "full_name",
    "user_id",
    "password",
    "email",
    "phone",
    "college",
    "field",
    "rank",
    "courses",
    "students"
];

export default class SuperController {
    static async create(req, res) {
        if (!existAllParams(requiredSuperParams, req.body)) {
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
                courses,
                students
            } = req.body;
            const password_hash = await hash(password, 10); // hash the password with salt round 10

            const role = await Role.findOne({name: ROLES[4]});

            const supervisor = new SUPER({
                full_name,
                user_id,
                password_hash,
                email,
                phone,
                college,
                field,
                rank,
                role,
                courses,
                students
            });
            const data = await supervisor.save(supervisor);
            res.status(201).json(
                createResponse(true, "Supervisor Created Successfully !", data)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while creating the Supervisor."
                )
            );
        }
    }

    static async getRegistrations(req,res){
        try {
            const registration_list = []
            const course_id = req.params.id
            const data = await REGISTER.find()
            for (let i = 0; i < data.length; i++) {
                if (data[i].courses == course_id) {
                   registration_list.push(data[i])
                }
            }
            return res.status(201).json(createResponse(true, "Get Registration Successfully ", registration_list))


        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get all Registration.`
                    )
                );
        }
    }
}