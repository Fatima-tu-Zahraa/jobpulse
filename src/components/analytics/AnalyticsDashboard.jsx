import { Briefcase, TrendingUp, Calendar } from 'lucide-react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import useApplicationStore from '../../store/useApplicationStore'

const COLORS = {
  Applied: '#3b82f6',
  Interview: '#f59e0b',
  Offer: '#10b981',
  Rejected: '#ef4444',
}

function AnalyticsDashboard() {
  const applications = useApplicationStore((state) => state.applications)

  const statuses = ['Applied', 'Interview', 'Offer', 'Rejected']

  const chartData = statuses.map((status) => ({
    name: status,
    value: applications.filter((app) => app.status === status).length,
  }))

  const totalApplications = applications.length
  const interviewCount = applications.filter(
    (app) => app.status === 'Interview' || app.status === 'Offer'
  ).length
  const responseRate =
    totalApplications === 0
      ? 0
      : Math.round((interviewCount / totalApplications) * 100)

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Analytics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Total Applications</p>
              <Briefcase size={18} className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {totalApplications}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Response Rate</p>
              <TrendingUp size={18} className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {responseRate}%
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-sm">Active Interviews</p>
              <Calendar size={18} className="text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {applications.filter((app) => app.status === 'Interview').length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-md">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Status Breakdown
          </h3>

          {totalApplications === 0 ? (
            <p className="text-gray-400 text-sm">
              No applications yet. Add one to see your stats here.
            </p>
          ) : (
            <PieChart width={350} height={250}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard