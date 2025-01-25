import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeAgent = (user) => {
    axiosSecure.patch(`/users/agent/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Agent now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };


  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes. Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="table table-zebra">
          {/* Head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="whitespace-nowrap flex items-center gap-2">
                  {/* Dropdown Button */}
                  <div className=" text-white px-4 py-2 rounded-l"></div>
                  {/* Make agent Button */}
                  {user.role === "AGENT" ? (
                    <button disabled className="btn btn-primary">
                      Agent
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAgent(user)}
                      className="btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Make Agent
                    </button>
                  )}
                  {/* Make Admin Button */}
                  {user.role === "ADMIN" ? (
                    <button disabled className="btn btn-primary">
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Make Admin
                    </button>
                  )}
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
