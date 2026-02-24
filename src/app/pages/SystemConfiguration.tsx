import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Save, Mail, Globe, Bell, Database, Shield } from 'lucide-react';

type TabType = 'general' | 'email' | 'notifications' | 'database' | 'security';

export function SystemConfiguration() {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general' as TabType, label: 'General', icon: Settings },
    { id: 'email' as TabType, label: 'Email', icon: Mail },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell },
    { id: 'database' as TabType, label: 'Database', icon: Database },
    { id: 'security' as TabType, label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>System</span>
        <span>/</span>
        <span className="text-foreground font-medium">Configuration</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">System Configuration</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-2 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl inline-flex gap-2"
        style={{ background: 'var(--glass-bg)' }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    defaultValue="EduAdmin School Management System"
                    className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Time Zone
                  </label>
                  <select className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-6 (Central Time)</option>
                    <option>UTC-7 (Mountain Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Language
                  </label>
                  <select className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground mb-4">Email Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    placeholder="smtp.gmail.com"
                    className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      SMTP Port
                    </label>
                    <input
                      type="text"
                      placeholder="587"
                      className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Encryption
                    </label>
                    <select className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                      <option>TLS</option>
                      <option>SSL</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="noreply@school.edu"
                    className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', description: 'Receive email notifications for important events' },
                  { label: 'Push Notifications', description: 'Receive push notifications on your device' },
                  { label: 'SMS Notifications', description: 'Receive SMS for critical alerts' },
                  { label: 'System Updates', description: 'Get notified about system updates and maintenance' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-primary transition-colors">
                      <span className="inline-block h-6 w-6 translate-x-7 transform rounded-full bg-white transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground mb-4">Database Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Connection String
                  </label>
                  <input
                    type="text"
                    defaultValue="postgresql://localhost:5432/school_db"
                    className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Max Connections
                    </label>
                    <input
                      type="number"
                      defaultValue="100"
                      className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password Policy
                  </label>
                  <select className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                    <option>Strong (8+ chars, mixed case, numbers, symbols)</option>
                    <option>Medium (8+ chars, mixed case, numbers)</option>
                    <option>Basic (6+ chars)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full px-4 py-2.5 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-end gap-3">
            <button className="px-6 py-2.5 bg-card border border-border rounded-xl hover:bg-accent transition-colors">
              Reset
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
