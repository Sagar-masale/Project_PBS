import React, {useState} from "react";
import RegisterContext from "./RegisterContext";

const RegisterContextProvider = ({children}) => {
    const [registerStatus, setRegisterStatus] = useState(null)
    const [registerErrStatus, setRegisterErrStatus] = useState(null)
    const [loginNotify, setLoginNotify] = useState(null)
    const [logout, setLogout] = useState(null)
    const [networkErrStatus, setNetworkErrStatus] = useState(null)
    return(
        <RegisterContext.Provider value={
            {
            registerStatus, setRegisterStatus, 
            registerErrStatus, setRegisterErrStatus, 
            networkErrStatus, setNetworkErrStatus,
            loginNotify, setLoginNotify,
            logout, setLogout
            }
            }>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterContextProvider