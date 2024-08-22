import { FaClipboardList, FaTruck, FaUsers, FaWallet } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartstats = [] } = useQuery({
    queryKey: ["chartstats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // Custom shap for bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  // Custom func for pi chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Pichart data
  const piChartData = chartstats.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div>
      <div className="text-2xl font-semibold">
        <span>Hi Welcome </span>
        {user?.displayName ? user?.displayName : "Back"}
      </div>
      <div className="stats shadow w-full">
        {/* Revenue */}
        <div className="stat">
          <FaWallet className="text-xl" />

          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-title">Revenue</div>
        </div>
        {/* Customers */}
        <div className="stat">
          <FaUsers className="text-xl" />

          <div className="stat-value">{stats.users}</div>
          <div className="stat-title">Customers</div>
        </div>
        <div className="stat">
          <FaClipboardList className="text-xl" />

          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-title">Menus</div>
        </div>
        <div className="stat">
          <FaTruck className="text-xl" />

          <div className="stat-value">{stats.orders}</div>
          <div className="stat-title">Orders</div>
        </div>
      </div>

      {/* chart */}
      <div className="flex gap-4">
        {/* Bar Chart */}
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartstats}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartstats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* Pi chart */}
        <div className="w-1/2">
          <PieChart width={400} height={400}>
            <Pie
              data={piChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartstats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
