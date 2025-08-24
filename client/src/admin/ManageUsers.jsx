// src/admin/ManageUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        // If backend returns { users: [...] } or just an array
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (err) {
        console.error("❌ Failed to fetch users", err);
        setUsers([]); // fallback to empty array
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.isAdmin ? "Admin" : "User"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
