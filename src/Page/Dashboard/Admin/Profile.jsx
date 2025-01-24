import { useAuth } from "../../../hook/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        {user.role === "ADMIN"
          ? "Admin Profile"
          : user.role === "AGENT"
          ? "Agent Profile"
          : "My Profile"}
      </h1>
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="table table-zebra">
          {/* Head */}
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Image</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img
                  src={user.image}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <th>{user.role}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
