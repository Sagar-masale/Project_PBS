import React, {useState} from "react";
import ProfileContext from "./ProfileContext";

const ProfileContextProvider = ({children}) => {
    const [userData, setUserData] = useState('')
    const [updateUserData, setUpdateUserData ] = useState('')

    return(
        <ProfileContext.Provider value = {
           {
            userData, setUserData,
            updateUserData, setUpdateUserData
           } 
        }>
        {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider