import React, {useState} from "react";
import ReviewContext from "./ReviewContext";


const ReviewContextProvider = ({children}) => {
    const [reviews, setReviews] = useState([]);
    return(
        <ReviewContext.Provider value={
            {
                reviews, setReviews
            }
            }>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContextProvider