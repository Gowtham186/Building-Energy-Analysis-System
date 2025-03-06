import { useState } from "react";
import { Link } from "react-router-dom";
import CitySelect from "../Components/CitySelect";
import FacadeDirectionSelect from "../Components/FacadeDirectionSelect";
import { useDispatch, useSelector } from "react-redux";
import { createBuildingConfig } from "../redux/design-slice";

export default function Home() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ city: "" });
    const { loading } = useSelector((state) => state.design);
    const [facades, setFacades] = useState([
        { facadeDirection: "", height: 0, width: 0, wwr: 0, shgc: 0, duration: 0 }
    ]);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};

    const runClientvalidations = () => {
        if (formData.city.trim().length === 0) {
            errors.city = "City is required";
        }
    
        facades.forEach((ele, i) => {
            if (ele.facadeDirection.trim().length === 0) {
                errors[`facadeDirection${i}`] = "Facade Direction is required";
            }
            if (ele.height <= 0) {
                errors[`height${i}`] = "Height must be greater than 0";
            }
            if (ele.width <= 0) {
                errors[`width${i}`] = "Width must be greater than 0";
            }
            if (ele.wwr < 0 || ele.wwr > 1) {
                errors[`wwr${i}`] = "WWR must be between 0 and 1";
            }
            if (ele.shgc < 0 || ele.shgc > 1) {
                errors[`shgc${i}`] = "SHGC must be between 0 and 1";
            }
            if (ele.duration <= 0) {
                errors[`duration${i}`] = "Duration must be greater than 0";
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        runClientvalidations();
        console.log({ ...formData, facades });
        if (Object.keys(errors).length !== 0) {
            console.log(errors);
            setClientErrors(errors);
        } else {
            setClientErrors({});
            // dispatch(createBuildingConfig({ formData: { ...formData, facades } }))
        }
    };

    const updateFacade = (index, field, value) => {
        setFacades((prevFacades) =>
            prevFacades.map((facade, i) =>
                i === index ? { ...facade, [field]: value } : facade
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <nav className="mb-6">
                <Link
                    to="/dashboard"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Analysis Dashboard
                </Link>
            </nav>

            <h1 className="text-2xl font-bold mb-4">Enter Building Configuration</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Select City</label>
                    <CitySelect
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full border p-2 rounded-md"
                    />
                    {clientErrors.city && <p className="text-red-500 text-xs">{clientErrors.city}</p>}
                </div>

                {formData.city && (
                    <div className="space-y-4">
                        {facades.map((facade, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                                <label className="block text-gray-700 font-semibold mb-1">Facade Direction</label>
                                <FacadeDirectionSelect
                                    value={facade.facadeDirection}
                                    onChange={(e) => updateFacade(index, "facadeDirection", e.target.value)}
                                    className="w-full border p-2 rounded-md"
                                />
                                {clientErrors[`facadeDirection${index}`] && (
                                    <p className="text-red-500 text-xs">{clientErrors[`facadeDirection${index}`]}</p>
                                )}

                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Height"
                                            value={facade.height}
                                            onChange={(e) => updateFacade(index, 'height', e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                        {clientErrors[`height${index}`] && (
                                            <p className="text-red-500 text-xs">{clientErrors[`height${index}`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Width"
                                            value={facade.width}
                                            onChange={(e) => updateFacade(index, 'width', e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                        {clientErrors[`width${index}`] && (
                                            <p className="text-red-500 text-xs">{clientErrors[`width${index}`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            placeholder="WWR"
                                            value={facade.wwr}
                                            onChange={(e) => updateFacade(index, 'wwr', e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                        {clientErrors[`wwr${index}`] && (
                                            <p className="text-red-500 text-xs">{clientErrors[`wwr${index}`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            placeholder="SHGC"
                                            value={facade.shgc}
                                            onChange={(e) => updateFacade(index, 'shgc', e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                        {clientErrors[`shgc${index}`] && (
                                            <p className="text-red-500 text-xs">{clientErrors[`shgc${index}`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Duration"
                                            value={facade.duration}
                                            onChange={(e) => updateFacade(index, 'duration', e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                        {clientErrors[`duration${index}`] && (
                                            <p className="text-red-500 text-xs">{clientErrors[`duration${index}`]}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
                            onClick={() =>
                                setFacades([...facades, { facadeDirection: "", height: 0, width: 0, wwr: 0, shgc: 0, duration: 0 }])
                            }
                        >
                            + Add Facade
                        </button>
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}