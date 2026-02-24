import { motion } from 'motion/react';
import { Calendar, Plus, Check } from 'lucide-react';

const academicYears = [
  { id: '1', year: '2025-2026', startDate: 'Sep 1, 2025', endDate: 'Jun 30, 2026', status: 'upcoming', progress: 0 },
  { id: '2', year: '2024-2025', startDate: 'Sep 1, 2024', endDate: 'Jun 30, 2025', status: 'active', progress: 65 },
  { id: '3', year: '2023-2024', startDate: 'Sep 1, 2023', endDate: 'Jun 30, 2024', status: 'completed', progress: 100 },
];

export function AcademicYear() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>School Setup</span>
        <span>/</span>
        <span className="text-foreground font-medium">Academic Year</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Year</h1>
          <p className="text-muted-foreground">Manage academic years and timelines</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="w-5 h-5" />
          Create Academic Year
        </button>
      </motion.div>

      {/* Timeline View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
        style={{ background: 'var(--glass-bg)' }}
      >
        <h3 className="font-semibold text-foreground mb-6">Timeline</h3>
        <div className="space-y-8">
          {academicYears.map((year, index) => (
            <motion.div
              key={year.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              {/* Timeline Dot */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    year.status === 'active'
                      ? 'bg-gradient-to-br from-primary to-secondary'
                      : year.status === 'completed'
                      ? 'bg-green-500'
                      : 'bg-muted'
                  }`}
                >
                  {year.status === 'completed' ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Calendar className="w-6 h-6 text-white" />
                  )}
                </div>
                {index < academicYears.length - 1 && (
                  <div className="w-0.5 h-24 bg-border absolute top-12" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{year.year}</h4>
                    <p className="text-sm text-muted-foreground">
                      {year.startDate} - {year.endDate}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      year.status === 'active'
                        ? 'bg-primary/10 text-primary'
                        : year.status === 'completed'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    {year.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">{year.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${year.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      className={`h-full ${
                        year.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-gradient-to-r from-primary to-secondary'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
