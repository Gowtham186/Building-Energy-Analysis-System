import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteDesign, getAllDesigns } from "../redux/design-slice"

export default function AllDesigns() {
    const dispatch = useDispatch()
    const { loading, allDesigns, serverError } = useSelector((state) => state.design)

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
        console.log("Action for id:", id);
        const userConfirm = window.confirm("Are you sure?")
        if(userConfirm){
            dispatch(deleteDesign({id}))
        } 
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 text-left border-b">Name</th>
                        <th className="py-2 px-4 text-left border-b">City</th>
                        <th className="py-2 px-4 text-left border-b">Created Date</th>
                        <th className="py-2 px-4 text-left border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allDesigns.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.city}</td>
                            <td className="py-2 px-4 border-b">{new Date(item.createdAt).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    onClick={() => handleDelete(item._id)} 
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
