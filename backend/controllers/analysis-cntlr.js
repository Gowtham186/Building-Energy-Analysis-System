import Design from "../models/design-model.js"
import { coolingCostCalculcation } from "../utils/coolingCostCalculation.js"
import { heatGainCalculation } from "../utils/heatGainCalculation.js" 
import mongoose from "mongoose"

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

analysisCntlr.compare = async (req, res) => {
    try {
        const designIds = req.query.designIds;
        console.log(designIds);

        if (!designIds || designIds.length === 0) {
        return res.status(400).json({ errors: "No design Ids provided" });
        }

        const designIdArray = designIds.split(',');

        const objectIds = designIdArray.map(id => new mongoose.Types.ObjectId(id.trim()));

        const designs = await Design.find({ _id: { $in: objectIds } });
        console.log(designs);

        const comparisonResults = designs.map(design => {
        const analyses = design.analysis.map(data => ({
            facadeDirection: data.facadeDirection,
            Q: data.Q,
            coolingCost: data.coolingCost
        }));

        return {
            designId: design._id,
            name: design.name,
            city: design.city,
            analyses: analyses
        };
        });

        console.log(comparisonResults)
        return res.status(200).json(comparisonResults)

    } catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Something went wrong' });
    }
};

analysisCntlr.cityWiseRankings = async (req, res) => {
    try {
        const rankings = await Design.aggregate([
        { $unwind: "$analysis" },

        {
            $group: {
            _id: { city: "$city", designId: "$_id" },
            name: { $first: "$name" }, 
            coolingCost: { $sum: "$analysis.coolingCost" } 
            }
        },

        {
            $sort: {
            "_id.city": 1, 
            coolingCost: 1 
            }
        },

        {
            $group: {
            _id: "$_id.city", 
            designs: {
                $push: {
                designId: "$_id.designId",
                name: "$name",
                coolingCost: "$coolingCost"
                }
            }
            }
        }
        ]);

        console.log(rankings);
        return res.json(rankings);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Something went wrong' });
    }
};
  
export default analysisCntlr