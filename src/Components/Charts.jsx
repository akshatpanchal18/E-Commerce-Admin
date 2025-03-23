import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const userData = [
  { month: "Jan", users: 100 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 200 },
  { month: "Apr", users: 300 },
  { month: "May", users: 450 },
  { month: "Jun", users: 600 },
  { month: "Jul", users: 750 },
  { month: "Aug", users: 900 },
  { month: "Sep", users: 1100 },
  { month: "Oct", users: 1300 },
  { month: "Nov", users: 1500 },
  { month: "Dec", users: 1800 },
];

const salesData = [
  { month: "Jan", sales: 50 },
  { month: "Feb", sales: 80 },
  { month: "Mar", sales: 120 },
  { month: "Apr", sales: 160 },
  { month: "May", sales: 200 },
  { month: "Jun", sales: 300 },
  { month: "Jul", sales: 400 },
  { month: "Aug", sales: 500 },
  { month: "Sep", sales: 600 },
  { month: "Oct", sales: 750 },
  { month: "Nov", sales: 850 },
  { month: "Dec", sales: 1000 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* User Growth Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">User Growth (Last Year)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4F46E5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product Sales Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">
          Product Sales (Last Year)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
