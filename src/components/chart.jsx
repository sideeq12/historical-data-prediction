import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  datasets: [
    { label: "Jumia", data: [150000, 180000, 175000, 190000, 200000, 195000, 210000, 220000, 225000], borderColor: "#ff7300", fill: false },
    { label: "Konga", data: [170000, 165000, 160000, 175000, 180000, 190000, 200000, 215000, 220000], borderColor: "#38b000", fill: false },
    { label: "Jiji", data: [140000, 135000, 145000, 155000, 160000, 165000, 170000, 180000, 185000], borderColor: "#00aaff", fill: false },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "white" } },
  },
  scales: {
    x: { ticks: { color: "white" }, grid: { color: "#444" } },
    y: {
      ticks: { color: "white", stepSize: 25000 }, // Increase stepSize for more vertical space
      grid: { color: "#444" },
      min: 100000, // Set minimum value for more spacing
      max: 250000, // Set maximum value for more spacing
    },
  },
};

export default function PriceHistoryChart() {
  return (
    <div className="w-full h-[30rem] pt-4 px-10 pb-20 mt-4 bg-black rounded-lg">
      <h2 className="text-xl font-bold text-center text-white mb-4">Price History</h2>
      <Line data={data} options={options} />
    </div>
  );
}
