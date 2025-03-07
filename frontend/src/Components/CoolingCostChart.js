import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CoolingCostChart({ coolingCostResults }) {
    const conversionRate = 82; // Example: 1 USD = 82 INR, update with real-time rate if needed
    
    // Convert cooling costs from USD to INR
    const coolingCostsInINR = coolingCostResults?.map((facade) => {
        return { ...facade, coolingCost: facade.coolingCost * conversionRate };
    });

    const data = {
        labels: coolingCostsInINR?.map((facade) => facade.facadeDirection), // Facade Directions (e.g., North, South, etc.)
        datasets: [
            {
                label: 'Cooling Cost (INR)', // Label for the bar chart
                data: coolingCostsInINR?.map((facade) => facade.coolingCost), // Cooling cost data in INR for each facade
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bar background color (light blue)
                borderColor: 'rgba(54, 162, 235, 1)', // Border color for each bar (blue)
                borderWidth: 1,
                barThickness: 50, // Adjust thickness of bars if needed
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Facade Cooling Cost Estimation', // Title of the chart
            },
            tooltip: {
                enabled: true, // Enable tooltips on hover
            },
        },
    };

    return (
        <div className="flex">
            {/* Left side: Chart */}
            <div className="w-2/3 p-4">
                <Bar data={data} options={options} />
            </div>

            {/* Right side: Facade Details */}
            <div className="w-1/3 p-4">
                <h2 className="text-xl font-semibold mb-4">Facade Cooling Cost Details</h2>
                {coolingCostsInINR?.map((facade, index) => (
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
