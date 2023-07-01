import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";

const Term = db.terms
const ROLES = db.ROLES;
const PREREGISTER = db.preregistration
export default class studentEducationalController {
    static async getAllTerms(req, res) {
        if (req.user_role === ROLES[1] || req.user_role === ROLES[3] || req.user_role === ROLES[4]) {
            try {
                const data = await Term.find()
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
    }

    static async getSCPreregistered(req, res) {
        if (req.user_role === ROLES[1] || req.user_role === ROLES[3]) {
            const id = req.params.id
            try {
                const data = await Term.findById(id);
                const preregistration_semester_course_list = data.preregistration_semester_course;
                return res
                    .status(200)
                    .json(createResponse(true, "Get All Preregistration Semester Course", preregistration_semester_course_list));
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
    }

    static async providingSCPreregistration(req, res) {
        if (req.user_role === ROLES[1] || req.user_role === ROLES[3]) {
            const id = req.params.id
            try {
                const data = await Term.findById(id);
                const preregistration_semester_course_list = data.preregistration_semester_course;
                const course_preregistration =  req.body.preregistration_semester_course
                for (let i = 0; i <course_preregistration.length ; i++) {
                    preregistration_semester_course_list.push(course_preregistration[i]);
                    data.preregistration_semester_course = preregistration_semester_course_list;
                    await data.save();
                }
               return res
                    .status(200)
                    .json(createResponse(true, "semester course preregistered Successfully"));

            } catch (err) {
                res.status(500).json(
                    createResponse(
                        false,
                        err.message ||
                        "Some error occurred while adding semester course to preregistration."
                    )
                );
            }
        }

    }

    static async getPreregistrationOfTerm(req,res){
        const term_id = req.params.id
        PREREGISTER.find({ term: term_id })
            .then((foundDocuments) => {
                return res
                    .status(200)
                    .json(createResponse(true, "Get preregisterions  Successfully",foundDocuments));
            })
            .catch((err) => {
                res.status(500).json(
                    createResponse(
                        false,
                        err.message ||
                        "Some error occurred while getting preregistrations."
                    )
                );
            });

    }

    static async getSCRegistered(req, res) {
        if (req.user_role === ROLES[1] || req.user_role === ROLES[3]) {
            const id = req.params.id
            try {
                const data = await Term.findById(id);
                const registration_semester_course_list = data.registration_semester_course;
                return res
                    .status(200)
                    .json(createResponse(true, "Get All Registration Semester Course", registration_semester_course_list));
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

}