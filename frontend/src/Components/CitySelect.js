const CitySelect = ({ value, onChange }) => {
    const cities = ["Bangalore", "Mumbai", "Kolkata", "Delhi"];

    return(
        <select value={value} onChange={onChange} required>
            <option value="" disabled>Select a city</option>
            {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
            ))}
        </select>
    )
}
export default CitySelect