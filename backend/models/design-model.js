import { Schema, model } from "mongoose";

const designSchema = new Schema({
    dimensions : {
        type : { height : Number, width : Number},
        required : true
    },
    wwr : { 
        type : Number
    },
    shgc : {
        type : Number
    }
},{timestamps : true})

const Design = model('Design', designSchema)
export default Design