import { timeStamp } from "console";
import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            slug: "name",
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["0", "1"],
            default: "1", // ? 0: inactive, 1: active
        },
        meta_title: {
            type: String,
            slug: "name",
        },
        meta_description: {
            type: String,
            slug: "description",
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema, "categories");

export default Category;