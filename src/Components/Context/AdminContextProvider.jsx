import React, { Children, useState } from "react";

import AdminContext from "./AdminContext";

const AdminContextProvider = ({children}) => {
    const [adminData, setAdminData] = useState(null);
    const [adminLoginNotify, setAdminLoginNotify] = useState(null);
    const [adminLogoutNotify, setAdminLogoutNotify] = useState(null);

    return(
        <AdminContext.Provider value={
            {
                adminData, setAdminData,
                adminLoginNotify, setAdminLoginNotify,
                adminLogoutNotify, setAdminLogoutNotify
            }

        }>
            {children}
            </AdminContext.Provider>
    )
}

export default AdminContextProvider