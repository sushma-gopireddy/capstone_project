import mongoose from "mongoose";

const expenseSchema = mongoose.Schema ({
    text: {type: String,require: true},
    completed:{type: Boolean,default: false}
})

const Todo = mongoose.model('expenses',expenseSchema)

export default expenseSchema;