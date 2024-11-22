import React, {useState} from "react";
import RegisterContext from "./RegisterContext";

const RegisterContextProvider = ({children}) => {
    const [registerStatus, setRegisterStatus] = useState(null)
    return(
        <RegisterContext.Provider value={{registerStatus, setRegisterStatus}}>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterContextProvider