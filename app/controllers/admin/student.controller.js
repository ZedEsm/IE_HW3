import { hash } from "bcrypt";

import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";
import existAllParams from "../../utils/exist-all-params.js";

const Student = db.students;
const Role = db.roles;
const ROLES = db.ROLES;

const requiredStudentParams = [
    "full_name",
    "user_id",
    "password",
    "email",
    "phone",
    "degree",
    "incomingYear",
    "incomingSemester",
    "gradeAverage",
    "college",
    "field",
];

export default class StudentController {
    static async create(req, res) {
        if (!existAllParams(requiredStudentParams, req.body)) {
            return res
                .status(400)
                .json(createResponse(true, "Content is incomplete!"));
        }
        // Save Student in the database
        try {
            const {
                full_name,
                user_id,
                password,
                email,
                phone,
                degree,
                incomingYear,
                incomingSemester,
                gradeAverage,
                college,
                field,
                courses
            } = req.body;
            const password_hash = await hash(password, 10); // hash the password with salt round 10

            const role = await Role.findOne({ name: ROLES[3] });

            const student = new Student({
                full_name,
                user_id,
                password_hash,
                email,
                phone,
                degree,
                incomingYear,
                incomingSemester,
                gradeAverage,
                college,
                field,
                role,
                courses
            });
            const data = await student.save(student);
            res.status(201).json(
                createResponse(true, "Student Created Successfully!", data)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while creating the Student."
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
            const data = await Student.findByIdAndUpdate(id, req.body, {
                useFindAndModify: true,
            });
            if (data)
                return res
                    .status(200)
                    .json(createResponse(true, "Student Updated Successfully"));
            return res
                .status(404)
                .json(createResponse(false, "Student not found"));
        } catch (err) {
            return res
                .status(500)
                .json(
                    false,
                    err.message ||
                        "Some error occurred while updating the Student."
                );
        }
    }

    static async delete(req, res) {
        const id = req.params.id;
        try {
            const data = await Student.findByIdAndRemove(id);
            if (data)
                return res
                    .status(200)
                    .json(createResponse(true, "Student Deleted Successfully"));
            return res
                .status(404)
                .json(createResponse(false, "Student not found"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                        "Some error occurred while deleting the Student."
                )
            );
        }
    }
    static async getAllStudents(req, res) {
        try {
            const data = await Student.find().populate('role');
            return res
                .status(200)
                .json(createResponse(true, "get all students", data));
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get all Students.`
                    )
                );
        }
    }
    static async getStudentById(req, res) {
        const id = req.params.id;
        try {
            const data = await Student.findById(id).populate('role');
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(true, `get Student with id ${id}.`, data)
                    );
            return res
                .status(404)
                .json(
                    createResponse(false, `Student with id ${id} not found.`)
                );
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get the Student.`
                    )
                );
        }
    }
}
