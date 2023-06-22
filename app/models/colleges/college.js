import mongoose from "mongoose";

export default (mongoose) => mongoose.model(
    "college",
    mongoose.schema({
        college_name:String
    })
)