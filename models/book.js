import mongoose from "mongoose"

let schemaProperties = {
    type: String,
    required: true,
    minlength: 1
}

let BookSchema = new mongoose.Schema({
    name: schemaProperties,
    author: schemaProperties,
    addedOn: {
        type: String,
        default: null
    },
    addedBy: schemaProperties
})

let Book = mongoose.model("Book", BookSchema)

export default Book