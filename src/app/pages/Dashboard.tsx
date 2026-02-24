import { useEffect, useState } from 'react';
import { useQuery, useMutation } from "@apollo/client/react";
import { motion } from 'motion/react';
import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface KPICardProps {
  title: string;
  value: number;
  target: number;
  change: number;
  icon: any;
  delay: number;
}

function KPICard({ title, value, target, change, icon: Icon, delay }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
      style={{
        background: 'var(--glass-bg)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
            isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold text-foreground">{displayValue.toLocaleString()}</p>
        <span className="text-sm text-muted-foreground mb-1">/ {target.toLocaleString()}</span>
      </div>
      <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(displayValue / target) * 100}%` }}
          transition={{ delay: delay + 0.3, duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </motion.div>
  );
}

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1450 },
  { month: 'Mar', users: 1680 },
  { month: 'Apr', users: 1920 },
  { month: 'May', users: 2340 },
  { month: 'Jun', users: 2680 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const attendanceData = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 95 },
  { day: 'Wed', rate: 89 },
  { day: 'Thu', rate: 94 },
  { day: 'Fri', rate: 88 },
  { day: 'Sat', rate: 85 },
];

const recentActivities = [
  { user: 'John Smith', action: 'Updated student record', time: '2 minutes ago', type: 'update' },
  { user: 'Sarah Johnson', action: 'Created new academic year', time: '15 minutes ago', type: 'create' },
  { user: 'Mike Wilson', action: 'Assigned teacher to Class 10A', time: '1 hour ago', type: 'assign' },
  { user: 'Emma Davis', action: 'Generated fee invoices', time: '2 hours ago', type: 'generate' },
  { user: 'System', action: 'Automated backup completed', time: '3 hours ago', type: 'system' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>Administration</span>
        <span>/</span>
        <span className="text-foreground font-medium">Dashboard</span>
      </motion.div>

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">System Monitoring Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Users"
          value={2680}
          target={3000}
          change={12.5}
          icon={Users}
          delay={0.2}
        />
        <KPICard
          title="Active Students"
          value={1845}
          target={2000}
          change={8.3}
          icon={UserCheck}
          delay={0.3}
        />
        <KPICard
          title="Active Staff"
          value={156}
          target={200}
          change={5.2}
          icon={Briefcase}
          delay={0.4}
        />
        <KPICard
          title="Revenue (Monthly)"
          value={67000}
          target={75000}
          change={-2.1}
          icon={DollarSign}
          delay={0.5}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">User Growth</h3>
              <p className="text-sm text-muted-foreground">Last 6 months trend</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="month" stroke="#a1a1aa" style={{ fontSize: '12px' }} />
              <YAxis stroke="#a1a1aa" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  color: '#e4e4e7',
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground">Monthly revenue in USD</p>
            </div>
            <div className="p-2 rounded-lg bg-secondary/10">
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="month" stroke="#a1a1aa" style={{ fontSize: '12px' }} />
              <YAxis stroke="#a1a1aa" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  color: '#e4e4e7',
                }}
              />
              <Bar dataKey="revenue" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Attendance and Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2 rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Attendance Overview</h3>
              <p className="text-sm text-muted-foreground">This week's attendance rate</p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="day" stroke="#a1a1aa" style={{ fontSize: '12px' }} />
              <YAxis stroke="#a1a1aa" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  color: '#e4e4e7',
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#10b981"
                fill="url(#areaGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <h3 className="font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Server Uptime</span>
                <span className="text-sm font-medium text-green-400">99.9%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '99.9%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-400"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Database</span>
                <span className="text-sm font-medium text-green-400">Healthy</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.1, duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-400"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">API Response</span>
                <span className="text-sm font-medium text-green-400">45ms</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '95%' }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-400"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium text-yellow-400">68%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ delay: 1.3, duration: 1 }}
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
        style={{ background: 'var(--glass-bg)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Recent Activity</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs text-white font-semibold flex-shrink-0">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <div
                className={`px-2 py-1 rounded-lg text-xs ${
                  activity.type === 'system'
                    ? 'bg-blue-500/10 text-blue-400'
                    : activity.type === 'create'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-purple-500/10 text-purple-400'
                }`}
              >
                {activity.type}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
