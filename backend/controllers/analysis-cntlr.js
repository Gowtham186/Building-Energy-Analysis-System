import Design from "../models/design-model.js"
import { coolingCostCalculcation } from "../utils/coolingCostCalculation.js"
import { heatGainCalculation } from "../utils/heatGainCalculation.js" 

const analysisCntlr = {}

analysisCntlr.calculate = async(req,res)=>{
    const { designId } = req.body
    try{
        const design = await Design.findById(designId)
        if (!design) {
            return res.status(404).json({ error: "Design not found" });
        }

        const heatGainResults = heatGainCalculation(design)
        console.log("heatGainResults", heatGainResults)

        const coolingCostResults = coolingCostCalculcation(design, heatGainResults)
        console.log("coolingCostResults", coolingCostResults)

        design.analysis = coolingCostResults
        await design.save()
        return res.json(coolingCostResults)

    }catch(err){
        console.log(err)
        return res.status(500).json({errors : 'something went wrong'})
    }
}

export default analysisCntlr