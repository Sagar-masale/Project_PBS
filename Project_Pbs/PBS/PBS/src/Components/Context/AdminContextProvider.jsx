import React, { Children, useState } from "react";

import AdminContext from "./AdminContext";

const AdminContextProvider = ({children}) => {
    const [adminData, setAdminData] = useState(null);

    return(
        <AdminContext.Provider value={
            {
                adminData, setAdminData
            }

        }>
            {children}
            </AdminContext.Provider>
    )
}

export default AdminContextProvider