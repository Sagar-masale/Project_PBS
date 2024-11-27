import React, {useState} from "react";
import RegisterContext from "./RegisterContext";

const RegisterContextProvider = ({children}) => {
    const [registerStatus, setRegisterStatus] = useState(null)
    const [registerErrStatus, setRegisterErrStatus] = useState(null)
    return(
        <RegisterContext.Provider value={{registerStatus, setRegisterStatus, registerErrStatus, setRegisterErrStatus}}>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterContextProvider