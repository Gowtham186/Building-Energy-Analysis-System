import Select from 'react-select';

const FacadeDirectionSelect = ({ value, onChange }) => {
    const directions = ['north', 'east', 'south', 'west'];

    const options = directions.map(direction => ({
        value: direction,
        label: direction.charAt(0).toUpperCase() + direction.slice(1), // Capitalize the direction
    }));

    return (
        <Select
            value={options.find(option => option.value === value)} 
            onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : '')}
            options={options}
            placeholder="Select a facade direction"
            isClearable
        />
    );
};

export default FacadeDirectionSelect;