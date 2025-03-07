import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FacadeHeatGainChart({ heatGainResults }) {
    const data = {
        labels: heatGainResults?.map(facade => facade.facadeDirection),
        datasets: [
            {
                label: 'Heat Gain (Q) in BTU',
                data: heatGainResults?.map(facade => facade.Q),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 100,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Facade Heat Gain Results',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="flex justify-between">
            <div className="w-2/3 p-4">
                <Bar data={data} options={options} />
            </div>

            <div className="w-1/3 p-4">
                <h2 className="text-xl font-semibold mb-4">Facade Details</h2>
                {heatGainResults?.map((facade, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-bold">{facade.facadeDirection} Facade</h3>
                        <ul>
                        <li><strong>Heat Gain (Q):</strong> {facade.Q.toFixed(0)} BTU</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
