import {hash} from "bcrypt";

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
    static async createOneProfessor(req, res) {
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

            const role = await Role.findOne({name: ROLES[2]});

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
    static async create(req, res) {
        try {
            const professorsData = req.body;

            if (!Array.isArray(professorsData) || professorsData.length === 0) {
                return res
                    .status(400)
                    .json(createResponse(true, "No professors data found in the request!"));
            }

            const professorsToCreate = [];

            // Validate each professor object in the array
            for (const professorData of professorsData) {
                if (!existAllParams(requiredProfessorParams, professorData)) {
                    return res
                        .status(400)
                        .json(createResponse(true, "Content is incomplete for one or more professors!"));
                }

                const {
                    full_name,
                    user_id,
                    password,
                    email,
                    phone,
                    college,
                    field,
                    rank,
                } = professorData;

                const password_hash = await hash(password, 10);

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

                professorsToCreate.push(professor);
            }

            // Save all professors in the database
            const createdProfessors = await Professor.insertMany(professorsToCreate);

            res.status(201).json(
                createResponse(true, "Professors Created Successfully!", createdProfessors)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message || "Some error occurred while creating the professors."
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
        const DEFAULT_PAGE_SIZE = 10;
        try {
            const professor_name = req.query.profName;
            let courseFound = null
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
            const data = await Professor.find().populate('role');
            courseFound = data
            if (professor_name) {
                courseFound = data.filter(
                    (item) => item.full_name === professor_name
                );
            }

            let paginatedCourseFound = courseFound;
            if (courseFound) {
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                paginatedCourseFound = courseFound.slice(startIndex, endIndex);
            }

            return res
                .status(200)
                .json(createResponse(true, "get all students", paginatedCourseFound));
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

    static async createListOfProfessors(req, res) {
        if (!existAllParams(requiredProfessorParams, req.body)) {
            return res
                .status(400)
                .json(createResponse(true, "Content is incomplete!"));
        }
        // Save Professors in the database
        try {
            const professorsData = req.body.professors; // Assuming professorsData is an array of professor objects
            const professors = [];
            for (const professorData of professorsData) {
                const {
                    full_name,
                    user_id,
                    password,
                    email,
                    phone,
                    college,
                    field,
                    rank,
                } = professorData;
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
                professors.push(professor);
            }
            const data = await Professor.insertMany(professors);
            res.status(201).json(
                createResponse(
                    true,
                    "Professors Created Successfully!",
                    data
                )
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while creating the Professors."
                )
            );
        }
    }
}
