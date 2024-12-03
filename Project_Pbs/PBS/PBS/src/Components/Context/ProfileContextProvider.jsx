import React, {useState} from "react";
import ProfileContext from "./ProfileContext";

const ProfileContextProvider = ({children}) => {
    const [userData, setUserData] = useState('')

    return(
        <ProfileContext.Provider value = {
           {
            userData, setUserData
           } 
        }>
        {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider