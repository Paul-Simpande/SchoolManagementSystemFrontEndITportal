import { motion } from 'motion/react';
import { UserSquare2, Search, Filter, Plus } from 'lucide-react';

const students = [
  { id: '1', name: 'Emily Johnson', grade: 'Grade 10', class: '10-A', enrollment: 'ENR2024001', status: 'active' },
  { id: '2', name: 'Michael Chen', grade: 'Grade 10', class: '10-B', enrollment: 'ENR2024002', status: 'active' },
  { id: '3', name: 'Sophia Williams', grade: 'Grade 9', class: '9-A', enrollment: 'ENR2024003', status: 'active' },
  { id: '4', name: 'James Martinez', grade: 'Grade 11', class: '11-C', enrollment: 'ENR2024004', status: 'inactive' },
  { id: '5', name: 'Olivia Brown', grade: 'Grade 12', class: '12-A', enrollment: 'ENR2024005', status: 'active' },
];

export function StudentManagement() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>Students</span>
        <span>/</span>
        <span className="text-foreground font-medium">Student Management</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Management</h1>
          <p className="text-muted-foreground">Manage student records and enrollment</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="w-5 h-5" />
          Enroll Student
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-xl border border-border hover:bg-accent transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl backdrop-blur-xl border border-[var(--glass-border)] shadow-xl overflow-hidden"
        style={{ background: 'var(--glass-bg)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Student</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Enrollment ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Grade</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Class</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-foreground">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{student.enrollment}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.grade}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.class}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        student.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
