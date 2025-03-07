import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDesign } from "../redux/design-slice";
import FacadeHeatGainChart from "../Components/FacadeHeatGainChart";
import CoolingCostChart from "../Components/CoolingCostChart";

export default function AnalysisDashboard() {
    const dispatch = useDispatch();
    const { designId, loading, designData, serverError } = useSelector((state) => state.design);

    useEffect(() => {
        const storedDesignId = designId || localStorage.getItem('designId');
        if (storedDesignId) {
            localStorage.setItem('designId', storedDesignId);
            dispatch(getDesign({ id: storedDesignId }));
        }
    }, [dispatch, designId]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (serverError) {
        return <p className="text-center text-red-500">Error: {serverError}</p>;
    }

    if (!designData) {
        return <p className="text-center text-gray-500">No data found</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Design Analysis Dashboard</h2>
            <p className="text-xl text-gray-700 mb-4"><strong>City:</strong> {designData?.city}</p>

            {designData?.facades && designData.facades.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designData.facades.map((facade, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Facade {index + 1}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-600 font-medium mb-1">Facade Direction</label>
                                    <p className="text-gray-700">{facade.facadeDirection}</p>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 font-medium mb-1">Duration</label>
                                    <p className="text-gray-700">{facade.duration}</p>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 font-medium mb-1">Height</label>
                                    <p className="text-gray-700">{facade.height} meters</p>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 font-medium mb-1">SHGC</label>
                                    <p className="text-gray-700">{facade.shgc}</p>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 font-medium mb-1">Width</label>
                                    <p className="text-gray-700">{facade.width} meters</p>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 font-medium mb-1">WWR</label>
                                    <p className="text-gray-700">{facade.wwr}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No facade data available</p>
            )}

            <div className="mt-12">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Facade Heat Gain Analysis</h1>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <FacadeHeatGainChart heatGainResults={designData?.analysis}/>
                </div>
            </div>
            <div className="mt-12">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Cooling Cost Estimation</h1>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <CoolingCostChart coolingCostResults={designData?.analysis}/>
                </div>
            </div>
        </div>
    );
}
