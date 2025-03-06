import solarRadiationData from "./solarRadiation.js"

export const heatGainCalculation = (design)=>{
    const { city, facades } = design

    const solarCityData = solarRadiationData[city]
    // console.log(solarCityData)

    // Q = A × SHGC × G × Δt 
    const facadeHeatgain = facades.map(facade => {
        const { facadeDirection, height, width, wwr, shgc, duration } = facade

        const A = height * width * wwr
        console.log(A)

        const G = solarCityData[facadeDirection]
        console.log(G)

        const Q = A * shgc * G  * duration
        console.log(Q)

        return { facadeDirection, Q}
    })
   
    return facadeHeatgain
    
}