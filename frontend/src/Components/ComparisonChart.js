import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function ComparisonChart() {
  const { comparisonResults } = useSelector((state) => state.analysis);
  
  const facadeDirections = [];
  const coolingCosts = [];
  const cities = [];

  comparisonResults.forEach(result => {
    result.analyses.forEach(analysis => {
      facadeDirections.push(analysis.facadeDirection);
      coolingCosts.push(analysis.coolingCost);
      cities.push(result.city); 
    });
  });

  const chartData = {
    labels: facadeDirections.map((direction, index) => `${direction} - ${cities[index]}`), 
    datasets: [
      {
        label: 'Cooling Cost',
        data: coolingCosts, 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Cooling Costs by Facade Direction and City</h2>
      <Bar data={chartData} />
    </div>
  );
}
