import { motion } from 'motion/react';
import { UsersRound, Search, Filter, Plus } from 'lucide-react';

const staff = [
  { id: '1', name: 'Dr. Robert Smith', role: 'Principal', department: 'Administration', email: 'robert@school.edu', status: 'active' },
  { id: '2', name: 'Jennifer Lee', role: 'Mathematics Teacher', department: 'Academics', email: 'jennifer@school.edu', status: 'active' },
  { id: '3', name: 'Carlos Rodriguez', role: 'Science Teacher', department: 'Academics', email: 'carlos@school.edu', status: 'active' },
  { id: '4', name: 'Amanda White', role: 'IT Administrator', department: 'Technology', email: 'amanda@school.edu', status: 'active' },
  { id: '5', name: 'Thomas Anderson', role: 'Librarian', department: 'Library', email: 'thomas@school.edu', status: 'inactive' },
];

export function StaffManagement() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>Staff</span>
        <span>/</span>
        <span className="text-foreground font-medium">Staff Management</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff members and teachers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="w-5 h-5" />
          Add Staff
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
            placeholder="Search staff..."
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
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Staff Member</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Department</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{member.role}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                      {member.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{member.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        member.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {member.status}
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
