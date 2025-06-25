import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import '../AdminAcc.css';
import AdminContext from "../../../Context/AdminContext";
import AdminSlideBar from "../AdminSlideBar";

function AllUsers() {
  const { adminData } = useContext(AdminContext);
  const adminName = adminData?.data?.adminFullName || "Admin";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/admins/All-Users");
        console.log("API Response:", response.data); // Debugging log
        setUsers(response.data.data || []); // If users are inside a `users` key
        console.log("before:",users);
      } catch (error) {
        setError("Error fetching users. Please try again later.");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (adminData) {
      fetchUsers();
      
      
    }
  }, [adminData]);
  
  
 

  // console.log("Users", users);

    // Filter users based on searchQuery
    const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phoneNumber?.includes(searchQuery)
      )
    : [];
    // console.log("Users Data:", users);
  
  

  const handleEditAllUser = (userId) => {
    alert("Edit functionality coming soon. User ID: " + userId);
  };

  const handleDeleteAllUser = (userId) => {
    alert("Delete functionality coming soon. User ID: " + userId);
  };

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "long", year: "numeric" }; // Example: 21 November 2024
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Adjust `undefined` for locale, e.g., "en-US"
  }
  

  return (
    <>
      {adminData ? (
        <div className="flex MainContainerAdmin min-h-screen text-white">
          <AdminSlideBar />

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <header className="flex justify-end items-center mb-8">
            <h2 className="TopSectionName font-bold text-lg mr-auto">Users : {users.length} </h2>
              <img
                src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-418179856.jpg"
                alt="Admin"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-2 text-sm">{adminName}</span>
            </header>
            
            

            {/* Users Table */}
            <div className="pt-6">
              {loading ? (
                <p>Loading users...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <div className="overflow-auto rounded-lg">
                  <tr className="flex justify-between align-items-center">
                    <h2 className="Status-Name p-4 text-left">User Status</h2>
                    <th className="p-4">
                    <div className="searchAdminBox SlideBar-Logos-Active flex w-full pl-2 adminSearch-Box">
                    <span className="material-symbols-outlined ">search</span>
                      <input
                        type="text"
                        placeholder="Search for..."
                        className="w-full adminSearch placeholder-[#AEB9C6] focus:ring-0"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      </div>
                    </th>
              </tr>
                  <table className="w-full table-auto text-sm">
                    <thead className="userCol">
                      <tr>
                        <th className="p-4 text-left">User ID</th>
                        <th className="p-4 text-left">User</th>
                        <th className="p-4 text-left">Register Date</th>
                        <th className="p-4 text-left">Country</th>
                        <th className="p-4 text-left">State</th>
                        <th className="p-4 text-left">More Information</th>
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    {filteredUsers.length === 0 ? (
                      <p className="text-[#8f85fe] text-center mt-4">User does not exist.</p>
                    ) : (
                      <tbody>
                        {filteredUsers
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date
                          .map((user) => (
                            <tr key={user._id} className="userDetails" loading="lazy">
                              <td className="p-4">{user._id}</td>
                              <td className="p-4">
                                <div>
                                  <p className="font-bold">{user.fullName}</p>
                                  <p className="text-gray-400">{user.email}</p>
                                </div>
                              </td>
                              <td className="p-4">{formatDate(user.createdAt)}</td>
                              <td className="p-4">{user.country || "..."}</td>
                              <td className="p-4">{user.state || "..."}</td>
                              <td className="p-4 font-bold">{user.moreInfo || "..."}</td>
                              <td className="p-4 flex space-x-3">
                                <button
                                  onClick={() => handleEditAllUser(user._id)}
                                  className="text-[#8f85fe] hover:text-[#9389ff57]"
                                >
                                  <span className="material-symbols-outlined text-[22px]">edit</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteAllUser(user._id)}
                                  className="text-[#8f85fe] hover:text-[#9389ff57]"
                                >
                                  <span className="material-symbols-outlined text-[22px]">delete</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    )}

                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Please log in as an admin to view user data.</h1>
      )}
    </>
  );
}

export default AllUsers;