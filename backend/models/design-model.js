import { Schema, model } from "mongoose";

const designSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    city:{
        type : String,
        required : true,
        enum : ["Bangalore", "Mumbai", "Kolkata", "Delhi"]
    },
    facades: {
        type: [{
            facadeDirection: { 
                type: String, 
                required: true, 
                enum: ['north', 'east', 'south', 'west'] 
            },
            height: { type: Number, required: true },
            width: { type: Number, required: true },
            wwr: { type: Number, required: true, min: 0, max: 1 },
            shgc: { type: Number, required: true, min: 0, max: 1 },
            duration: { type: Number, required: true, min: 0 }
        }],
        required: true
    },    
    analysis: {
        type :[
            {
                facadeDirection: String,
                Q: Number,  
                coolingCost: Number 
            }
        ],
        default : []
    }
},{timestamps : true})

const Design = model('Design', designSchema)
export default Design