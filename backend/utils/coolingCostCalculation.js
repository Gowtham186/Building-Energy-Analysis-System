import electricityRates from "./electricityRate.js";

export const coolingCostCalculcation = (design, heatGainResults)=>{
    const { city } = design
    const electricityRate = electricityRates[city]

    const facadeCoolingCost = heatGainResults.map(ele => {
        const coolingLoad = ele.Q / 3412
        const energyConsumed = coolingLoad / 4 
        const coolingCost = parseFloat((energyConsumed * electricityRate).toFixed(2))

        return { ...ele, coolingCost}
    })

    return facadeCoolingCost
}