import Select from 'react-select'

const CitySelect = ({ value, onChange }) => {
    const cities = ["Bangalore", "Mumbai", "Kolkata", "Delhi"];

    const options = cities.map(city => ({
        value: city,
        label: city
    }));

    return (
        <Select
            value={options.find(option => option.value === value)} 
            onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : '')} 
            options={options} 
            placeholder="Select a city"
            isClearable
        />
    )       
}
export default CitySelect;
