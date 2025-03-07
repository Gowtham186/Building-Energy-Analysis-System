import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteDesign, getAllDesigns, updateDesign } from "../redux/design-slice"
import { compareDesigns } from "../redux/analysis-slice"
import ComparisonChart from "../Components/ComparisonChart"

export default function AllDesigns() {
    const dispatch = useDispatch()
    const { loading, allDesigns, serverError } = useSelector((state) => state.design)

    // Local state to keep track of selected design IDs
    const [selectedDesigns, setSelectedDesigns] = useState([])

    // State for handling the edit modal and selected design details
    const [isEditing, setIsEditing] = useState(false)
    const [editDesign, setEditDesign] = useState({})

    useEffect(() => {
        dispatch(getAllDesigns())
    }, [dispatch])

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (serverError) {
        return <p className="text-center text-red-500">Error: {serverError}</p>;
    }

    if (allDesigns.length === 0) {
        return <p className="text-center text-gray-500">No designs found</p>;
    }

    const handleDelete = (id) => {
        const userConfirm = window.confirm("Are you sure?");
        if (userConfirm) {
            dispatch(deleteDesign({ id }));
        }
    };

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            // Add the id to the selected list
            setSelectedDesigns((prev) => [...prev, id]);
        } else {
            // Remove the id from the selected list
            setSelectedDesigns((prev) => prev.filter((designId) => designId !== id));
        }
    };

    const handleCompare = () => {
        if (selectedDesigns.length < 2) {
            alert("Please select at least two designs to compare.");
            return;
        }
        dispatch(compareDesigns(selectedDesigns));
    };

    const handleEdit = (design) => {
        setEditDesign(design); 
        setIsEditing(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
    
        // Include the id with the updated data
        const updatedDesign = {
            id: editDesign._id,  // Include the ID for updating
            name: editDesign.name,
        };
    
        dispatch(updateDesign(updatedDesign));
    
        setIsEditing(false); // Close the edit form
    };
    

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditDesign((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 text-left border-b">
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedDesigns(allDesigns.map((design) => design._id));
                                    } else {
                                        setSelectedDesigns([]);
                                    }
                                }}
                            />
                        </th>
                        <th className="py-2 px-4 text-left border-b">Name</th>
                        <th className="py-2 px-4 text-left border-b">City</th>
                        <th className="py-2 px-4 text-left border-b">Created Date</th>
                        <th className="py-2 px-4 text-left border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allDesigns.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="checkbox"
                                    checked={selectedDesigns.includes(item._id)}
                                    onChange={(e) => handleCheckboxChange(e, item._id)}
                                />
                            </td>
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.city}</td>
                            <td className="py-2 px-4 border-b">
                                {new Date(item.createdAt).toLocaleString()}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="ml-2 text-green-500 hover:text-green-700"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <button
                    onClick={handleCompare}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Compare Selected Designs
                </button>
            </div>

            <div>
                <ComparisonChart />
            </div>

            {/* Edit Form */}
            {isEditing && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl mb-4">Edit Design</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editDesign.name || ""}
                                    onChange={handleEditChange}
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            {/* Only display the city as non-editable */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={editDesign.city || ""}
                                    disabled
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 bg-gray-200"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="mr-2 text-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}