import { motion } from 'motion/react';
import { Headphones, Plus, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const tickets = [
  { id: 'TKT-001', title: 'Database connection timeout', status: 'open', priority: 'high', assignee: 'John Smith', created: '2 hours ago' },
  { id: 'TKT-002', title: 'User unable to login', status: 'in-progress', priority: 'medium', assignee: 'Sarah Johnson', created: '5 hours ago' },
  { id: 'TKT-003', title: 'Report generation slow', status: 'open', priority: 'low', assignee: 'Unassigned', created: '1 day ago' },
  { id: 'TKT-004', title: 'Email notification not sending', status: 'resolved', priority: 'high', assignee: 'Mike Wilson', created: '2 days ago' },
  { id: 'TKT-005', title: 'UI display issue on mobile', status: 'in-progress', priority: 'medium', assignee: 'Emma Davis', created: '3 days ago' },
];

const statusColumns = [
  { id: 'open', label: 'Open', color: 'blue' },
  { id: 'in-progress', label: 'In Progress', color: 'yellow' },
  { id: 'resolved', label: 'Resolved', color: 'green' },
];

export function TechnicalSupport() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>System</span>
        <span>/</span>
        <span className="text-foreground font-medium">Technical Support</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Technical Support</h1>
          <p className="text-muted-foreground">Manage support tickets and system diagnostics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="w-5 h-5" />
          Create Ticket
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Open Tickets', value: 8, icon: AlertCircle, color: 'blue' },
          { label: 'In Progress', value: 12, icon: Clock, color: 'yellow' },
          { label: 'Resolved Today', value: 15, icon: CheckCircle, color: 'green' },
          { label: 'Avg Response Time', value: '2.5h', icon: Clock, color: 'purple' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
              style={{ background: 'var(--glass-bg)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
              <h3 className="text-sm text-muted-foreground mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {statusColumns.map((column, columnIndex) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + columnIndex * 0.1 }}
            className="rounded-2xl p-4 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
            style={{ background: 'var(--glass-bg)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{column.label}</h3>
              <span className="px-2 py-1 rounded-lg text-xs bg-muted text-muted-foreground">
                {tickets.filter(t => t.status === column.id).length}
              </span>
            </div>
            <div className="space-y-3">
              {tickets
                .filter(ticket => ticket.status === column.id)
                .map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + columnIndex * 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-primary font-mono">{ticket.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          ticket.priority === 'high'
                            ? 'bg-red-500/10 text-red-400'
                            : ticket.priority === 'medium'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-blue-500/10 text-blue-400'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground mb-3">{ticket.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs text-white">
                          {ticket.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-muted-foreground">{ticket.assignee}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{ticket.created}</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Diagnostics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
        style={{ background: 'var(--glass-bg)' }}
      >
        <h3 className="font-semibold text-foreground mb-4">System Diagnostics</h3>
        <div className="space-y-3">
          {[
            { service: 'Web Server', status: 'operational', uptime: '99.9%' },
            { service: 'Database', status: 'operational', uptime: '99.7%' },
            { service: 'Email Service', status: 'degraded', uptime: '95.2%' },
            { service: 'API Gateway', status: 'operational', uptime: '99.5%' },
          ].map((service, index) => (
            <motion.div
              key={service.service}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    service.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'
                  }`}
                />
                <span className="font-medium text-foreground">{service.service}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-muted-foreground">Uptime: {service.uptime}</span>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    service.status === 'operational'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}
                >
                  {service.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
