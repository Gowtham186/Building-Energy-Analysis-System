const FacadeDirectionSelect = ({ value, onChange }) => {
    const directions = ['north', 'east', 'south', 'west']

    return(
        <select value={value} onChange={onChange} required>
            <option value="" disabled>Select facade direction</option>
            {directions.map((direction) => (
                <option key={direction} value={direction}>{direction}</option>
            ))}
        </select>
    )
}
export default FacadeDirectionSelect