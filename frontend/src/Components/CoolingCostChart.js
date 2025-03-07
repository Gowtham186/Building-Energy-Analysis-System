import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CoolingCostChart({ coolingCostResults }) {

    const data = {
        labels: coolingCostResults?.map((facade) => facade.facadeDirection), 
        datasets: [
            {
                label: 'Cooling Cost (INR)',
                data: coolingCostResults?.map((facade) => facade.coolingCost), 
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barThickness: 50, 
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Facade Cooling Cost Estimation', 
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="flex">
            <div className="w-2/3 p-4">
                <Bar data={data} options={options} />
            </div>

            <div className="w-1/3 p-4">
                <h2 className="text-xl font-semibold mb-4">Facade Cooling Cost Details</h2>
                {coolingCostResults?.map((facade, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-bold">{facade.facadeDirection} Facade</h3>
                        <ul>
                            <li><strong>Cooling Cost:</strong> {facade.coolingCost.toFixed(2)} INR</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
