import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Plus, Edit, Trash2, Check, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    userCount: 3,
    permissions: ['user.create', 'user.read', 'user.update', 'user.delete', 'role.manage', 'system.config'],
  },
  {
    id: '2',
    name: 'School Administrator',
    description: 'Manage school operations and staff',
    userCount: 12,
    permissions: ['user.read', 'user.update', 'student.manage', 'staff.manage', 'academic.manage'],
  },
  {
    id: '3',
    name: 'Teacher',
    description: 'Access to teaching and student management',
    userCount: 156,
    permissions: ['student.read', 'class.manage', 'grade.manage', 'attendance.manage'],
  },
  {
    id: '4',
    name: 'Staff',
    description: 'Limited access to specific modules',
    userCount: 45,
    permissions: ['student.read', 'report.view'],
  },
];

const permissionModules = [
  {
    module: 'User Management',
    permissions: [
      { id: 'user.create', name: 'Create Users' },
      { id: 'user.read', name: 'View Users' },
      { id: 'user.update', name: 'Update Users' },
      { id: 'user.delete', name: 'Delete Users' },
    ],
  },
  {
    module: 'Role Management',
    permissions: [
      { id: 'role.manage', name: 'Manage Roles' },
      { id: 'role.assign', name: 'Assign Roles' },
    ],
  },
  {
    module: 'Student Management',
    permissions: [
      { id: 'student.manage', name: 'Manage Students' },
      { id: 'student.read', name: 'View Students' },
    ],
  },
  {
    module: 'Staff Management',
    permissions: [
      { id: 'staff.manage', name: 'Manage Staff' },
      { id: 'staff.read', name: 'View Staff' },
    ],
  },
  {
    module: 'Academic Management',
    permissions: [
      { id: 'academic.manage', name: 'Manage Academic' },
      { id: 'class.manage', name: 'Manage Classes' },
      { id: 'grade.manage', name: 'Manage Grades' },
      { id: 'attendance.manage', name: 'Manage Attendance' },
    ],
  },
  {
    module: 'System Configuration',
    permissions: [
      { id: 'system.config', name: 'System Config' },
      { id: 'report.view', name: 'View Reports' },
    ],
  },
];

export function RolePermissions() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]);

  const togglePermission = (permissionId: string) => {
    if (!selectedRole) return;
    
    const hasPermission = selectedRole.permissions.includes(permissionId);
    const updatedPermissions = hasPermission
      ? selectedRole.permissions.filter(p => p !== permissionId)
      : [...selectedRole.permissions, permissionId];

    const updatedRole = { ...selectedRole, permissions: updatedPermissions };
    setSelectedRole(updatedRole);
    setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span>Administration</span>
        <span>/</span>
        <span className="text-foreground font-medium">Roles & Permissions</span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Roles & Permissions</h1>
          <p className="text-muted-foreground">Configure user roles and access permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="w-5 h-5" />
          Create Role
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <h3 className="font-semibold text-foreground mb-4">Roles</h3>
          <div className="space-y-2">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedRole?.id === role.id
                    ? 'bg-primary/10 border border-primary'
                    : 'bg-muted/30 border border-transparent hover:border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{role.name}</h4>
                      <p className="text-xs text-muted-foreground">{role.userCount} users</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                      <Edit className="w-3.5 h-3.5 text-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Permission Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl p-6 backdrop-blur-xl border border-[var(--glass-border)] shadow-xl"
          style={{ background: 'var(--glass-bg)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Permissions for {selectedRole?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedRole?.permissions.length} permissions granted
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>

          <div className="space-y-6">
            {permissionModules.map((module, moduleIndex) => (
              <motion.div
                key={module.module}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + moduleIndex * 0.05 }}
                className="border border-border rounded-xl p-4"
              >
                <h4 className="font-medium text-foreground mb-4">{module.module}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {module.permissions.map((permission) => {
                    const isGranted = selectedRole?.permissions.includes(permission.id);
                    return (
                      <motion.button
                        key={permission.id}
                        onClick={() => togglePermission(permission.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                          isGranted
                            ? 'bg-green-500/10 border border-green-500/30'
                            : 'bg-muted/30 border border-border hover:border-primary/30'
                        }`}
                      >
                        <span className={`text-sm ${isGranted ? 'text-green-400' : 'text-muted-foreground'}`}>
                          {permission.name}
                        </span>
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center ${
                            isGranted ? 'bg-green-500' : 'bg-muted'
                          }`}
                        >
                          {isGranted && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
