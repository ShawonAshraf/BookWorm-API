import mongoose from "mongoose"

let schemaProperties = {
    type: String,
    required: true,
    minlength: 1
}

let BookSchema = new mongoose.Schema({
    name: schemaProperties,
    author: schemaProperties,
    addedOn: new Date(),
    addedBy: schemaProperties
})

let Book = mongoose.model("Book", BookSchema)

export default Book