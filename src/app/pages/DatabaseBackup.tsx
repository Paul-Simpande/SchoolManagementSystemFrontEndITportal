import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Download, Upload, Clock, HardDrive, CheckCircle, AlertCircle, RotateCw } from 'lucide-react';

const backupHistory = [
  { id: '1', date: '2026-02-22 03:00 AM', size: '2.4 GB', type: 'Automated', status: 'success' },
  { id: '2', date: '2026-02-21 03:00 AM', size: '2.3 GB', type: 'Automated', status: 'success' },
  { id: '3', date: '2026-02-20 10:30 AM', size: '2.3 GB', type: 'Manual', status: 'success' },
  { id: '4', date: '2026-02-20 03:00 AM', size: '2.3 GB', type: 'Automated', status: 'success' },
  { id: '5', date: '2026-02-19 03:00 AM', size: '2.2 GB', type: 'Automated', status: 'failed' },
];

export function DatabaseBackup() {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => setIsBackingUp(false), 3000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>System</span>
        <span>/</span>
        <span className="text-foreground font-medium">Database & Backup</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Database & Backup</h1>
        <p className="text-muted-foreground">Manage database backups and restoration</p>
      </motion.div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-500/10">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Last Backup</h3>
              <p className="text-sm text-muted-foreground">3 hours ago</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">Success</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <HardDrive className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Storage Used</h3>
              <p className="text-sm text-muted-foreground">Total backups</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">24.8 GB</p>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '62%' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Next Scheduled</h3>
              <p className="text-sm text-muted-foreground">Automated backup</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">9 hours</p>
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
        style={{ background: 'var(--glass-bg)' }}
      >
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleBackup}
            disabled={isBackingUp}
            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
          >
            {isBackingUp ? (
              <RotateCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isBackingUp ? 'Backing Up...' : 'Create Backup Now'}
          </button>
          <button className="flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-xl hover:bg-accent transition-colors">
            <Upload className="w-5 h-5" />
            Restore from Backup
          </button>
          <button className="flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-xl hover:bg-accent transition-colors">
            <Database className="w-5 h-5" />
            Configure Schedule
          </button>
        </div>
      </motion.div>

      {/* Backup History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl backdrop-blur-xl border border-[var(--glass-border)] shadow-xl overflow-hidden"
        style={{ background: 'var(--glass-bg)' }}
      >
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">Backup History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Size</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((backup, index) => (
                <motion.tr
                  key={backup.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground">{backup.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{backup.size}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center gap-2 w-fit px-3 py-1 rounded-lg text-xs font-medium ${
                        backup.status === 'success'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {backup.status === 'success' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                      Restore
                    </button>
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
