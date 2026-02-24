import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Shield,
  GraduationCap,
  Calendar,
  CalendarClock,
  UserSquare2,
  UsersRound,
  Database,
  Lock,
  Headphones,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';

interface NavItem {
  name: string;
  icon: any;
  path: string;
  group?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/', group: 'Administration' },
  { name: 'User Management', icon: Users, path: '/users', group: 'Administration' },
  { name: 'Roles & Permissions', icon: Shield, path: '/roles', group: 'Administration' },
  { name: 'School Management', icon: GraduationCap, path: '/schools', group: 'School Setup' },
  { name: 'Academic Year', icon: Calendar, path: '/academic-year', group: 'School Setup' },
  { name: 'Term Management', icon: CalendarClock, path: '/terms', group: 'School Setup' },
  { name: 'Student Management', icon: UserSquare2, path: '/students', group: 'Students' },
  { name: 'Staff Management', icon: UsersRound, path: '/staff', group: 'Staff' },
  { name: 'Database & Backup', icon: Database, path: '/database', group: 'System' },
  { name: 'Security & Access', icon: Lock, path: '/security', group: 'System' },
  { name: 'Technical Support', icon: Headphones, path: '/support', group: 'System' },
  { name: 'Configuration', icon: Settings, path: '/config', group: 'System' },
];

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const groupedNavItems = navItems.reduce((acc, item) => {
    const group = item.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col border-r border-sidebar-border bg-sidebar"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-sm font-semibold text-sidebar-foreground">EduAdmin</h1>
                <p className="text-xs text-muted-foreground">IT Portal</p>
              </div>
            )}
          </motion.div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {Object.entries(groupedNavItems).map(([group, items], groupIndex) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.05 }}
            >
              {!sidebarCollapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group}
                </h3>
              )}
              <div className="space-y-1">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (groupIndex * items.length + index) * 0.02 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!sidebarCollapsed && (
                          <span className="text-sm">{item.name}</span>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div
            className={`flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs text-white font-semibold">
              AD
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Admin User
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  System Admin
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 bg-input rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-accent transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm text-white font-semibold cursor-pointer hover:shadow-lg hover:shadow-primary/30 transition-shadow">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
