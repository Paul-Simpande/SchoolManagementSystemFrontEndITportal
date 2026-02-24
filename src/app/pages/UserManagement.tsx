import { useState } from "react";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Key,
  UserCheck,
  UserX,
  X,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../../graphql/userOperations";
import {GET_SCHOOLS} from "@/graphql/schoolOperations.ts";
import {GET_GENDERS, GET_USER_STATUSES} from "@/graphql/statuses.ts";

interface FormData {
  schoolId: string;
  statusId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  genderId: number | "";
}

export function UserManagement() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const { data: schoolData } = useQuery(GET_SCHOOLS);
  const { data: genderData } = useQuery(GET_GENDERS);
  const { data: statusData } = useQuery(GET_USER_STATUSES);

  const schools = schoolData?.schools || [];
  const genders = genderData?.genders || [];
  const statuses = statusData?.userStatuses || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [openStatusMenu, setOpenStatusMenu] = useState<number | null>(null);

  const getStatusById = (statusId: number) => {
    return statuses.find((s: any) => s.statusId === statusId);
  };

  const getStatusStyles = (statusName: string) => {
    switch (statusName.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      case "suspended":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const [formData, setFormData] = useState<FormData>({
    statusId: 1,
    schoolId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    genderId: ""
  });

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  if (loading) return <p className="p-6">Loading users...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading users</p>;

  const users = (data as any)?.appUsers || [];

  const formattedUsers = users.map((u: any) => ({
    id: u.userId,
    schoolId: u.schoolId,
    statusId: u.statusId,
    genderId: u.genderId,
    firstName: u.firstName,
    lastName: u.lastName,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    phone: u.phone,
  }));

  const filteredUsers = formattedUsers.filter((user: any) => {
    const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
        user.id === userId
            ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
            : user
    ));
  };

  // ================= CREATE =================
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Creating user...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await createUser({
        variables: {
          input: {
            schoolId: Number(formData.schoolId),
            statusId: 1,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            genderId: Number(formData.genderId),
          },
          createdByUserId: 1,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User created successfully 🎉",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowCreateModal(false);
      setFormData({
        statusId: 1,
        schoolId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        genderId: "",
      });

      refetch();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
      });
    }
  };

  // ================= DELETE =================
  const handleDeleteUser = async (userId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await deleteUser({
        variables: {
          id: userId,
          userId: 1,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      refetch();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Delete failed",
      });
    }
  };

  // ================= UPDATE ================
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUserId) return;

    try {
      Swal.fire({
        title: "Updating user...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await updateUser({
        variables: {
          id: editUserId,
          input: {
            schoolId: Number(formData.schoolId),
            statusId: Number(formData.statusId),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            genderId: Number(formData.genderId),
          },
          userId: 1,
        },
      });

      Swal.fire({
        icon: "success",
        title: "User Updated Successfully 🎉",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowEditModal(false);
      refetch();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  const handleStatusChange = async (user: any, newStatusId: number) => {
    try {
      Swal.fire({
        title: "Updating status...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await updateUser({
        variables: {
          id: user.id,
          input: {
            schoolId: user.schoolId,
            statusId: newStatusId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            genderId: user.genderId,
          },
          userId: 1,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
      <div className="space-y-6 p-6 bg-white w-full h-full">
        <h1 className="text-3xl font-bold">User Management</h1>

        {/* Search */}
        <div className="flex gap-4">
          <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg w-64"
          />

          <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus size={16} /> Create User
          </button>
        </div>

        {/* Users Table */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl backdrop-blur-xl border border-[var(--glass-border)] shadow-xl overflow-hidden"
            style={{ background: "var(--glass-bg)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
              </thead>

              <tbody>
              {filteredUsers.map((user: any, index: number) => (
                  <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    {/* USER */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm text-white font-semibold">
                          {user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                        </div>

                        <div>
                          <p className="font-medium text-foreground">
                            {user.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PHONE */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                      N/L
                    </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      {(() => {
                        const statusObj = getStatusById(user.statusId);
                        const statusName = statusObj?.statusName || "Unknown";

                        return (
                            <span
                                className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusStyles(
                                    statusName
                                )}`}
                            >
        {statusName}
      </span>
                        );
                      })()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                              setFormData({
                                schoolId: String(user.schoolId),
                                statusId: user.statusId,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                phone: user.phone,
                                genderId: user.genderId,
                              });
                              setEditUserId(user.id);
                              setShowEditModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                        >
                          <Edit className="w-4 h-4 text-foreground" />
                        </button>
                        <div className="relative">
                          <button
                              onClick={() =>
                                  setOpenStatusMenu(
                                      openStatusMenu === user.id ? null : user.id
                                  )
                              }
                              className="p-2 rounded-lg hover:bg-accent transition-colors"
                          >
                            <Key className="w-4 h-4 text-foreground" />
                          </button>

                          {openStatusMenu === user.id && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                                {statuses.map((status: any) => (
                                    <button
                                        key={status.statusId}
                                        onClick={() => {
                                          handleStatusChange(user, status.statusId);
                                          setOpenStatusMenu(null);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                      {status.statusName}
                                    </button>
                                ))}
                              </div>
                          )}
                        </div>
                        <button
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setShowDeleteDialog(true);
                            }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
              ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CREATE MODAL */}
        <AnimatePresence>
          {showCreateModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Create User</h2>

                  <form onSubmit={handleCreateUser} className="space-y-3">
                    <select
                        value={formData.schoolId}
                        onChange={(e) =>
                            setFormData({ ...formData, schoolId: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                        required
                    >
                      <option value="">Select School</option>
                      {schools.map((school: any) => (
                          <option key={school.schoolId} value={school.schoolId}>
                            {school.schoolName}
                          </option>
                      ))}
                    </select>
                    <input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <select
                        value={formData.genderId}
                        onChange={(e) =>
                            setFormData({ ...formData, genderId: Number(e.target.value) })
                        }
                        className="w-full border p-2 rounded"
                        required
                    >
                      <option value="">Select Gender</option>
                      {genders.map((genders: any) => (
                          <option key={genders.genderId} value={genders.genderId}>
                            {genders.genderName}
                          </option>
                      ))}
                    </select>

                    <div className="flex gap-2">
                      <button
                          type="submit"
                          className="flex-1 bg-blue-600 text-white py-2 rounded"
                      >
                        Create
                      </button>
                      <button
                          type="button"
                          onClick={() => setShowCreateModal(false)}
                          className="flex-1 border py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          )}
        </AnimatePresence>

        {/* UPDATE MODAL */}
        <AnimatePresence>
          {showEditModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Edit User</h2>

                  <form onSubmit={handleUpdateUser} className="space-y-3">

                    <select
                        value={formData.schoolId}
                        onChange={(e) =>
                            setFormData({ ...formData, schoolId: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                        required
                    >
                      <option value="">Select School</option>
                      {schools.map((school: any) => (
                          <option key={school.schoolId} value={school.schoolId}>
                            {school.schoolName}
                          </option>
                      ))}
                    </select>

                    <select
                        value={formData.statusId}
                        onChange={(e) =>
                            setFormData({ ...formData, statusId: Number(e.target.value) })
                        }
                        className="w-full border p-2 rounded"
                    >
                      {statuses.map((status: any) => (
                          <option key={status.statusId} value={status.statusId}>
                            {status.statusName}
                          </option>
                      ))}
                    </select>

                    <input
                        value={formData.firstName}
                        onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        value={formData.lastName}
                        onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    />

                    <select
                        value={formData.genderId}
                        onChange={(e) =>
                            setFormData({ ...formData, genderId: Number(e.target.value) })
                        }
                        className="w-full border p-2 rounded"
                    >
                      {genders.map((g: any) => (
                          <option key={g.genderId} value={g.genderId}>
                            {g.genderName}
                          </option>
                      ))}
                    </select>

                    <div className="flex gap-2">
                      <button
                          type="submit"
                          className="flex-1 bg-blue-600 text-white py-2 rounded"
                      >
                        Update
                      </button>
                      <button
                          type="button"
                          onClick={() => {
                            setShowEditModal(false);
                            setFormData({
                              statusId: 1,
                              schoolId: "",
                              firstName: "",
                              lastName: "",
                              email: "",
                              phone: "",
                              genderId: "",
                            });
                          }}
                          className="flex-1 border py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          )}
        </AnimatePresence>

        {/* DELETE MODAL */}
        <AnimatePresence>
          {showDeleteDialog && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60">
                <div className="bg-white p-6 rounded-lg w-80">
                  <h2 className="text-lg font-bold mb-4">Delete User?</h2>
                  <div className="flex gap-2">
                    <button
                        onClick={() => setShowDeleteDialog(false)}
                        className="flex-1 border py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                        onClick={() => {
                          if (selectedUserId) {
                            handleDeleteUser(selectedUserId);
                            setShowDeleteDialog(false);
                          }
                        }}
                        className="flex-1 bg-red-600 text-white py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
          )}
        </AnimatePresence>
      </div>
  );
}