import { useEffect, useState } from "react";
import { listenUsers, updateUserRole } from "../../firebase/firestoreApi";
import { useAuth } from "../../contexts/AuthContext";

export default function ManageUsers() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const unsub = listenUsers(setUsers);
    return unsub;
  }, []);

  async function handleRoleChange(id, role) {
    setUpdatingId(id);
    try {
      await updateUserRole(id, role);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl mb-1">Users</h2>
        <p className="text-sm text-(--color-smoke)">
          Control who has access to the admin dashboard. Give trusted staff the "admin" role.
        </p>
      </div>

      <div className="ticket border border-(--color-ink)/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-[11px] uppercase tracking-widest text-(--color-smoke) border-b border-(--color-ink)/10">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-ink)/10">
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-(--color-smoke)">
                  No registered users yet.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium">{u.name || "—"}</td>
                <td className="px-4 py-3 text-(--color-smoke)">{u.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.role || "customer"}
                    disabled={updatingId === u.id || u.id === currentUser?.uid}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="rounded border border-(--color-ink)/15 bg-white px-2 py-1 text-xs font-mono uppercase tracking-widest disabled:opacity-50"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  {u.id === currentUser?.uid && (
                    <span className="ml-2 text-xs text-(--color-smoke)">(you)</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
