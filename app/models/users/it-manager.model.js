import BaseUserSchema from "./_core-user.model.js";

export default (mongoose) =>
    BaseUserSchema(mongoose).discriminator("itManagers", mongoose.Schema({}));
