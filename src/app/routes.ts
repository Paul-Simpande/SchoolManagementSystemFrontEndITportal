import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { UserManagement } from "./pages/UserManagement";
import { RolePermissions } from "./pages/RolePermissions";
import { SchoolManagement } from "./pages/SchoolManagement";
import { AcademicYear } from "./pages/AcademicYear";
import { TermManagement } from "./pages/TermManagement";
import { StudentManagement } from "./pages/StudentManagement";
import { StaffManagement } from "./pages/StaffManagement";
import { DatabaseBackup } from "./pages/DatabaseBackup";
import { SecurityAccess } from "./pages/SecurityAccess";
import { TechnicalSupport } from "./pages/TechnicalSupport";
import { SystemConfiguration } from "./pages/SystemConfiguration";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "users", Component: UserManagement },
      { path: "roles", Component: RolePermissions },
      { path: "schools", Component: SchoolManagement },
      { path: "academic-year", Component: AcademicYear },
      { path: "terms", Component: TermManagement },
      { path: "students", Component: StudentManagement },
      { path: "staff", Component: StaffManagement },
      { path: "database", Component: DatabaseBackup },
      { path: "security", Component: SecurityAccess },
      { path: "support", Component: TechnicalSupport },
      { path: "config", Component: SystemConfiguration },
    ],
  },
]);
