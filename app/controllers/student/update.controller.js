import StudentController from "../admin/student.controller.js";
import createResponse from "../../utils/create-response.js";

export default class UpdateController {
    static async update(req, res){
        const id = req.params.id;
        if (id && req.user_id === id){
            await StudentController.update(req, res);
        } else {
            res.status(403).json(createResponse(false, "access denied"));
        }
    }
}