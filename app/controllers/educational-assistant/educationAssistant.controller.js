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

            Term.find({user_id}).then(async data => {
                const isNameMatching = data.some(obj => obj.name === name);
                if (!isNameMatching) {
                    const data = await term.save(term);
                    res.status(201).json(
                        createResponse(true, "Term Added Successfully!", data)
                    );
                } else {
                    res.status(500).json(createResponse(false, "saving failed"))
                }
            })


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

    static async getTermById(req, res) {
        const id = req.params.id;
        try {


            const data = await Term.findById(id).populate
            ({path:"user_id",model:"BaseUserSchema",populate:{path:"courses",model:"courses"}}).populate({path:"preregistration_semester_course",model:"courses"}).populate({path:"registration_semester_course",model:"courses"});
            // const data = await Term.findById(id).populate
            // ({path:"user_id",model:"BaseUserSchema",populate:{path:"courses",model:"courses"}}); //TODO:p   const data = await Term.findById(id).populate({path:"user_id",model:"BaseUserSchema",populate:{path:"courses",model:"courses"}}); //TODO:popolate role ok kon
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

    static async updateTermById(req, res) {
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
                {useFindAndModify: true}
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

    static async deleteTermById(req, res) {
        const id = req.params.id;
        try {
            const data = await Term.findByIdAndRemove(id);
            if (data)
                return res
                    .status(200)
                    .json(createResponse(true, "Term Deleted Successfully"));
            return res
                .status(404)
                .json(createResponse(false, "Term not found!"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while deleting term."
                )
            );
        }
    }
    static async deleteSCPreregistration(req, res) {
        const id = req.params.id
        const course_id = req.params.cid
        try {
            const data = await Term.findById(id);
            const preregistration_semester_course_list = data.preregistration_semester_course;
            const isNameMatching = preregistration_semester_course_list.some(obj => obj.equals(course_id));
            if (isNameMatching) {
                const index = preregistration_semester_course_list.indexOf(course_id);
                if (index !== -1) {
                    preregistration_semester_course_list.splice(index, 1);
                    data.preregistration_semester_course = preregistration_semester_course_list;
                    await data.save();
                    return res
                        .status(200)
                        .json(createResponse(true, "Semester Course Deleted Successfully"));
                }
            }
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while getting preregistration semester course."
                )
            );
        }
    }

    static async providingSCRegistration(req, res) {
        const id = req.params.id
        try {
            const data = await Term.findById(id);
            const registration_semester_course_list = data.registration_semester_course;
            const course_registration =  req.body.registration_semester_course
            for (let i = 0; i <course_registration.length ; i++) {
               registration_semester_course_list.push(course_registration[i]);
                data.registration_semester_course = registration_semester_course_list;
                await data.save();
            }
            return res
                .status(200)
                .json(createResponse(true, "semester course registered Successfully"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while adding semester course to registration."
                )
            );
        }
    }



    static async deleteSCRegistration(req, res) {
        const id = req.params.id
        const course_id = req.params.cid
        try {
            const data = await Term.findById(id);
            const registration_semester_course_list = data.registration_semester_course;
            const isNameMatching = registration_semester_course_list.some(obj => obj.equals(course_id));
            if (isNameMatching) {
                const index = registration_semester_course_list.indexOf(course_id);
                if (index !== -1) {
                    registration_semester_course_list.splice(index, 1);
                    data.preregistration_semester_course = registration_semester_course_list;
                    await data.save();
                    return res
                        .status(200)
                        .json(createResponse(true, "Semester Course Deleted Successfully"));
                }
            }
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while getting registration semester course."
                )
            );
        }
    }



}