import {hash} from "bcrypt";

import db from "../../models/index.js";
import createResponse from "../../utils/create-response.js";
import existAllParams from "../../utils/exist-all-params.js";


const Student = db.students;
const Role = db.roles;
const ROLES = db.ROLES;
const PREREGISTER = db.preregistration
const REGISTER = db.registration
const TERM = db.terms
const COURSES = db.courses
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
    static async createOneStudent(req, res) {
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
                courses,
                supervisor,
                passed_courses

            } = req.body;
            const password_hash = await hash(password, 10); // hash the password with salt round 10

            const role = await Role.findOne({name: ROLES[3]});

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
                courses,
                supervisor,
                passed_courses
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

    static async create(req, res) {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res
                .status(400)
                .json(createResponse(true, "Invalid or empty student list!"));
        }

        const createdStudents = [];

        try {
            for (const studentData of req.body) {
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
                    courses,
                    supervisor,
                    passed_courses
                } = studentData;

                const password_hash = await hash(password, 10);

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
                    courses,
                    supervisor,
                    passed_courses
                });

                const createdStudent = await student.save();
                createdStudents.push(createdStudent);
            }

            res.status(201).json(
                createResponse(true, "Students Created Successfully!", createdStudents)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message || "Some error occurred while creating the students."
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
        const DEFAULT_PAGE_SIZE = 10;
        try {
            const student_name = req.query.studentName;
            let courseFound = null
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
            const data = await Student.find().populate('role');
            courseFound = data
            if (student_name) {
                courseFound = data.filter(
                    (item) => item.full_name === student_name
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

    static async preregisterDemand(req, res) {
        try {
            const student = req.user_id
            const {courses} =
                req.body;
            const preregistration = new PREREGISTER({
                student,
                courses
            });

            const data = await preregistration.save(preregistration);

            res.status(201).json(
                createResponse(true, "Preregistered Successfully!", data)
            );
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while Preregistering."
                )
            );
        }
    }

    static async preregisterDemandById(req, res) {
        try {
            const id = req.params.id
            const student = req.user_id
            const preregister = await PREREGISTER.findById(id)
            if (preregister.student && student == preregister.student) {
                const course_lst = preregister.courses;
                course_lst.push(req.body.courses)
                preregister.courses = course_lst;
                await preregister.save()
                res.status(201).json(createResponse(true, "Preregistered Course Successfully"))
            } else {
                res.status(400).json(
                    createResponse(false, "Access Denied")
                );
            }

        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while Preregistering."
                )
            );
        }
    }

    static async preregisterCourseInSpecifiedTerm(req, res) {
        try {
            const term = req.params.id
            const student = req.user_id
            const preregister = await TERM.findById(term)
            const {courses} =
                req.body;
            const preregistration = new PREREGISTER({
                student,
                courses,
                term
            });
            const preregistration_semester_course = preregister.preregistration_semester_course
            for (const item1 of preregistration_semester_course) {
                const strItem1 = String(item1);
                for (const item2 of courses) {
                    const strItem2 = String(item2);
                    if (strItem1 === strItem2) {
                        const data = await preregistration.save(preregistration);
                        res.status(201).json(
                            createResponse(true, "Preregistered Successfully!", data))
                    }
                }
            }

        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while Preregistering."
                )
            );
        }
    }

    static async deletePreregisterDemand(req, res) {
        const id = req.params.id;
        const courseId = req.params.course_id
        try {
            const data = await PREREGISTER.findById(id);
            const courses_list = data.courses;
            const isMatching = courses_list.some(obj => {
                return obj._id == courseId

            })
            if (isMatching) {
                const index = courses_list.indexOf(courseId);
                if (index !== -1) {
                    courses_list.splice(index, 1);
                    data.courses = courses_list;
                    await data.save();
                    return res
                        .status(200)
                        .json(createResponse(true, "Preregistered Course Deleted Successfully"));
                }
            }

            return res
                .status(404)
                .json(createResponse(false, "Preregistered Course not found"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while deleting the preregistered course."
                )
            );
        }
    }

    static async getPreregistration(req, res) {
        const DEFAULT_PAGE_SIZE = 10;
        try {
            const preregistration_list = []
            const course_id = req.params.id
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
            const examLocation = req.query.examLocation;
            const data = await PREREGISTER.find().populate({path:"courses",model:"semesterCourses"})

            for (let i = 0; i < data.length; i++) {

                let z = data[i].courses
                for (let j = 0; j <z.length ; j++) {
                    if (z[j]._id == course_id && z[j].examLocation == examLocation) {
                       preregistration_list.push(data[i])
                     }
                }//TODO
            }
            let paginatedCourseFound = preregistration_list;
            if (preregistration_list) {
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                paginatedCourseFound = preregistration_list.slice(startIndex, endIndex);
            }

            return res.status(201).json(createResponse(true, "Get Preregistration Successfully ", paginatedCourseFound))


        } catch (err) {
            return res
                .status(500)
                .json(
                    createResponse(
                        false,
                        err.message || `Could not get all Preregistration.`
                    )
                );
        }
    }

    static async registerCourseById(req, res) {
        try {
            const id = req.params.id
            const student = req.user_id
            const register = await REGISTER.findById(id)
            if (register.student && student == register.student) {
                const course_lst = register.courses;
                course_lst.push(req.body.courses)
                register.courses = course_lst;
                await register.save()
                res.status(201).json(createResponse(true, "Registered Course Successfully"))
            } else {
                res.status(400).json(
                    createResponse(false, "Access Denied")
                );
            }

        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while Registering."
                )
            );
        }
    }

    static async registerDemand(req, res) {
        try {
            const term = req.params.id
            const student_id = req.user_id
            const register = await TERM.findById(term)
            const {courses, confirmed} =
                req.body;
            const registration = new REGISTER({
                student_id,
                courses,
                term,
                confirmed
            });
            let courses_lst = []
            for (let i = 0; i < courses.length; i++) {
                const course = await COURSES.findById(courses[i])
                courses_lst.push(course)
            }
            const hasDuplicateExamDate = coursesList => {
                for (let i = 0; i < coursesList.length - 1; i++) {
                    for (let j = i + 1; j < coursesList.length; j++) {
                        if (coursesList[i].examDate === coursesList[j].examDate) {
                            return true;
                        }
                    }
                }
                return false;
            };
            const passedPrerequisites = async coursesList => {
                const student = await Student.findById(student_id)
                const courses_passed = student.passed_courses
                for (let i = 0; i < coursesList.length; i++) {
                    const prerequisite_lst = coursesList[i].prerequisites
                    for (let j = 0; j < prerequisite_lst.length; j++) {
                        for (let k = 0; k < courses_passed.length; k++) {
                            if (prerequisite_lst[i].equals(courses_passed[k])) {
                                return true
                            }
                        }
                    }

                }
                return false
            };
            if (hasDuplicateExamDate(courses_lst)) {
                res.status(500).json(
                    createResponse(
                        false,
                        "The Course Have Conflict!"
                    )
                );
            }
            if (await passedPrerequisites(courses_lst)) {
                const registration_semester_course = register.registration_semester_course

                let hasCommonAttribute = false;

                for (let i = 0; i < registration_semester_course.length; i++) {
                    const item1 = registration_semester_course[i];
                    const strItem1 = String(item1);

                    for (let j = 0; j < courses.length; j++) {
                        const item2 = courses[j];
                        const strItem2 = String(item2);

                        if (strItem1 === strItem2) {
                            hasCommonAttribute = true;
                            break;
                        }
                    }

                    if (hasCommonAttribute) {
                        break;
                    }
                }
                if (hasCommonAttribute) {
                    const data = await registration.save(registration);
                    return res.status(201).json(createResponse(true, "Registered Course Successfully", data))
                }
                return res.status(500).json(
                    createResponse(
                        false,

                        "Some error occurred while Registering."
                    )
                );

            } else {
                res.status(500).json(
                    createResponse(
                        false,
                        "You did not passed preregistered course."
                    )
                );
            }


        } catch (err) {
            return res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while Registering."
                )
            );
        }


    }

    static async deleteRegisteredCourse(req, res) {
        const id = req.params.id;
        const courseId = req.params.course_id

        try {
            const data = await REGISTER.findById(id);
            const courses_list = data.courses;
            const isMatching = courses_list.some(obj => {
                return obj._id == courseId

            })
            if (isMatching) {
                const index = courses_list.indexOf(courseId);
                if (index !== -1) {
                    courses_list.splice(index, 1);
                    data.courses = courses_list;
                    await data.save();
                    return res
                        .status(200)
                        .json(createResponse(true, "Preregistered Course Deleted Successfully"));
                }
            }

            return res
                .status(404)
                .json(createResponse(false, "Preregistered Course not found"));
        } catch (err) {
            res.status(500).json(
                createResponse(
                    false,
                    err.message ||
                    "Some error occurred while deleting the preregistered course."
                )
            );
        }

    }

    static async getRegistrationsByTermId(req, res) {
        if (req.user_role == "supervisor") {
            const term_id = req.params.id
            REGISTER.find({term: term_id})
                .then((foundDocuments) => {
                    return res
                        .status(200)
                        .json(createResponse(true, "Get registrations  Successfully", foundDocuments));
                })
                .catch((err) => {
                    res.status(500).json(
                        createResponse(
                            false,
                            err.message ||
                            "Some error occurred while getting registrations."
                        )
                    );
                });
        } else {
            const student_id = req.user_id
            const term_id = req.params.id
            REGISTER.find({student: student_id})
                .then((foundDocuments) => {
                    if (foundDocuments.some(obj => String(obj.term) === term_id))
                        return res
                            .status(200)
                            .json(createResponse(true, "Get registrations  Successfully", foundDocuments));
                })
                .catch((err) => {
                    res.status(500).json(
                        createResponse(
                            false,
                            err.message ||
                            "Some error occurred while getting registrations."
                        )
                    );
                });
        }

    }

}
