export default (mongoose) =>
    mongoose.model(
        "roles",
        mongoose.Schema({
            name: {
                type: String,
                trim: true,
                unique: true,
                required: true,
                default: "student",
                index: true
            },
        })
    );
