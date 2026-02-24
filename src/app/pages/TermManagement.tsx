import { motion } from 'motion/react';
import { CalendarClock, Plus } from 'lucide-react';

const terms = [
  { id: '1', name: 'Fall Semester', year: '2024-2025', startDate: 'Sep 1, 2024', endDate: 'Dec 20, 2024', status: 'completed' },
  { id: '2', name: 'Spring Semester', year: '2024-2025', startDate: 'Jan 8, 2025', endDate: 'May 30, 2025', status: 'active' },
  { id: '3', name: 'Summer Term', year: '2024-2025', startDate: 'Jun 5, 2025', endDate: 'Aug 15, 2025', status: 'upcoming' },
];

export function TermManagement() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>School Setup</span>
        <span>/</span>
        <span className="text-foreground font-medium">Term Management</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Term Management</h1>
          <p className="text-muted-foreground">Manage academic terms and semesters</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="w-5 h-5" />
          Create Term
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {terms.map((term, index) => (
          <motion.div
            key={term.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
            style={{ background: 'var(--glass-bg)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <CalendarClock className="w-6 h-6 text-white" />
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  term.status === 'active'
                    ? 'bg-primary/10 text-primary'
                    : term.status === 'completed'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-muted/30 text-muted-foreground'
                }`}
              >
                {term.status}
              </span>
            </div>

            <h3 className="font-semibold text-foreground mb-1">{term.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{term.year}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Start Date</span>
                <span className="text-foreground font-medium">{term.startDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">End Date</span>
                <span className="text-foreground font-medium">{term.endDate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
