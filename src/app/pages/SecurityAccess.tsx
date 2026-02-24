import { motion } from 'motion/react';
import { Lock, Shield, AlertTriangle, Activity, Plus, X } from 'lucide-react';

const securityMetrics = [
  { label: 'Failed Login Attempts', value: 12, status: 'warning', color: 'yellow' },
  { label: 'Active Sessions', value: 145, status: 'normal', color: 'green' },
  { label: 'Suspicious Activity', value: 3, status: 'alert', color: 'red' },
  { label: '2FA Enabled Users', value: 87, status: 'good', color: 'green' },
];

const ipWhitelist = [
  { id: '1', ip: '192.168.1.100', description: 'Office Network', addedDate: '2025-01-15' },
  { id: '2', ip: '10.0.0.50', description: 'VPN Gateway', addedDate: '2025-01-20' },
  { id: '3', ip: '172.16.0.1', description: 'Admin Workstation', addedDate: '2025-02-01' },
];

const recentLogs = [
  { id: '1', event: 'Failed login attempt', user: 'unknown', ip: '203.0.113.45', time: '2 min ago', severity: 'high' },
  { id: '2', event: 'Successful login', user: 'john@school.edu', ip: '192.168.1.100', time: '15 min ago', severity: 'low' },
  { id: '3', event: 'Password reset', user: 'sarah@school.edu', ip: '192.168.1.105', time: '1 hour ago', severity: 'medium' },
  { id: '4', event: 'Permission changed', user: 'admin@school.edu', ip: '192.168.1.100', time: '2 hours ago', severity: 'medium' },
];

export function SecurityAccess() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>System</span>
        <span>/</span>
        <span className="text-foreground font-medium">Security & Access</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Security & Access</h1>
        <p className="text-muted-foreground">Monitor security and manage access controls</p>
      </motion.div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
            style={{ background: 'var(--glass-bg)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-3 rounded-xl ${
                  metric.color === 'red'
                    ? 'bg-red-500/10'
                    : metric.color === 'yellow'
                    ? 'bg-yellow-500/10'
                    : 'bg-green-500/10'
                }`}
              >
                {metric.color === 'red' ? (
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                ) : metric.color === 'yellow' ? (
                  <Activity className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Shield className="w-6 h-6 text-green-400" />
                )}
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-2">{metric.label}</h3>
            <p className="text-3xl font-bold text-foreground">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
        style={{ background: 'var(--glass-bg)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">Require 2FA for all administrator accounts</p>
          </div>
          <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-primary transition-colors">
            <span className="inline-block h-6 w-6 translate-x-7 transform rounded-full bg-white transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* IP Whitelist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
        style={{ background: 'var(--glass-bg)' }}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">IP Whitelist</h3>
            <p className="text-sm text-muted-foreground">Manage trusted IP addresses</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add IP
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">IP Address</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Description</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Added Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ipWhitelist.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground font-mono">{item.ip}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.description}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.addedDate}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 rounded-lg hover:bg-accent transition-colors">
                      <X className="w-4 h-4 text-destructive" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Security Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="rounded-2xl backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
        style={{ background: 'var(--glass-bg)' }}
      >
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Security Events</h3>
        </div>
        <div className="p-6 space-y-3">
          {recentLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    log.severity === 'high'
                      ? 'bg-red-400'
                      : log.severity === 'medium'
                      ? 'bg-yellow-400'
                      : 'bg-green-400'
                  }`}
                />
                <div>
                  <p className="text-sm text-foreground font-medium">{log.event}</p>
                  <p className="text-xs text-muted-foreground">
                    {log.user} from {log.ip}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{log.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
