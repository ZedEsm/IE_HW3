import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";

const Term = db.terms
export default class EducationAssistantController {
    static async create(req, res) {
        try {
            const {name, user_id, semester_courses} = req.body
            const term = new Term({
                name, user_id, semester_courses
            })
            const data = await term.save(term);
            res.status(201).json(
                createResponse(true, "Term Added Successfully!", data)
            );

        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while adding the Term."
                )
            );
        }
    }

    static async getAllTerms(req, res) {
        try {
            const data = await Term.find();
            return res
                .status(200)
                .json(createResponse(true, "get all terms", data));
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get all Terms.`
                    )
                );
        }
    }

    static async getTermById(req, res) {
        const id = req.params.id;
        try {
            const data = await Term.findById(id)//.populate('role'); //TODO:popolate role ok kon
            if (data)
                return res
                    .status(200)
                    .json(
                        createResponse(true, `get Term with id ${id}.`, data)
                    );
            return res
                .status(404)
                .json(
                    createResponse(false, `Term with id ${id} not found.`)
                );
        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get the Term.`
                    )
                );
        }
    }

    static async updateTermById (req,res) {
        if (!Object.keys(req.body).length) {
            return res
                .status(400)
                .json(createResponse(false, "Content can not be empty!"));
        }
        try {
            const id = req.params.id;
            const data = await Term.findByIdAndUpdate(
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
                            "Term Updated Successfully"
                        )
                    );
            return res
                .status(404)
                .json(createResponse(false, "Term not found"));
        } catch (err) {
            return res
                .status(500)
                .json(
                    false,
                    err.message ||
                    "Some error occurred while updating the Term."
                );
        }
    }
}