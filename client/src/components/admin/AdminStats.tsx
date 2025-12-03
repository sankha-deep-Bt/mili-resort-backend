import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function AdminStats({ stats }: any) {
  const StatCard = ({ title, value, tone }: any) => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-stone-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${tone ? tone : ""}`}>{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard title="Requests" value={stats.total} />
      <StatCard title="Active Bookings" value={stats.active} />
      <StatCard title="Cancelled" value={stats.cancelled} tone="text-red-600" />
      <StatCard
        title="Estimated Revenue"
        value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
      />
    </div>
  );
}
