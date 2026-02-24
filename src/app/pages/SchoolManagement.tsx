import { motion } from 'motion/react';
import { GraduationCap, MapPin, Phone, Mail, Users, Plus, Edit, Trash2 } from 'lucide-react';

const schools = [
  { id: '1', name: 'Central High School', location: 'New York, NY', students: 1245, staff: 87, status: 'active' },
  { id: '2', name: 'Riverside Academy', location: 'Los Angeles, CA', students: 856, staff: 62, status: 'active' },
  { id: '3', name: 'Mountain View School', location: 'Denver, CO', students: 645, staff: 48, status: 'inactive' },
  { id: '4', name: 'Lakeside Institute', location: 'Chicago, IL', students: 1089, staff: 75, status: 'active' },
];

export function SchoolManagement() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>School Setup</span>
        <span>/</span>
        <span className="text-foreground font-medium">School Management</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">School Management</h1>
          <p className="text-muted-foreground">Manage schools in the system</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="w-5 h-5" />
          Add School
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schools.map((school, index) => (
          <motion.div
            key={school.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
            style={{ background: 'var(--glass-bg)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{school.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {school.location}
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  school.status === 'active'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {school.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Students</p>
                <p className="text-xl font-bold text-foreground">{school.students}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Staff</p>
                <p className="text-xl font-bold text-foreground">{school.staff}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
