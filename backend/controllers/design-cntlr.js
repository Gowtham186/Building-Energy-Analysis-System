import { validationResult } from "express-validator"
import Design from "../models/design-model.js"

const designCntlr = {}

designCntlr.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const body = req.body
    console.log(body)
    try{
        const newDesign = await Design.create(body)
        return res.status(201).json(newDesign)

    }catch(err){
        console.log(err)
        return res.status(500).json({errors : 'something went wrong'})
    }
}

designCntlr.list = async(req,res)=>{
    try{
        const allDesigns = await Design.find()

        if(allDesigns.length === 0){
            return res.status(404).json({errors : 'No Designs found'})
        }
        return res.json(allDesigns)
    }catch(err){
        return res.status(500).json({errors : 'something went wrong'})
    }
}

designCntlr.getDesign = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const id = req.params.id
    console.log(id)
    try{
        const design = await Design.findById(id)
        
        if(!design){
            return res.status(404).json({errors : 'Design not found'})
        }
        res.json(design)
        
    }catch(err){
        return res.status(500).json({errors : 'something went wrong'})
    }
}

designCntlr.update = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const id = req.params.id
    const body = req.body
    try{
        const design = await Design.findByIdAndUpdate(id, body, { runValidators : true, new : true})

        if(!design){
            return res.status(404).json({errors : 'Design not found'})
        }

        res.json(design)
    }catch(err){
        console.log(err)
        return res.status(500).json({errors : 'something went wrong'})
    }
}

designCntlr.remove = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const id = req.params.id
    try{
        const design = await Design.findByIdAndDelete(id)

        if(!design){
            return res.status(404).json({errors : 'Design not found'})
        }

        res.json(design)
    }catch(err){
        return res.status(500).json({errors : 'something went wrong'})
    }
}

export default designCntlr