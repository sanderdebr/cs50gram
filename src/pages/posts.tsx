import React, { useContext} from "react";
import { AuthContext} from "../firebase/context";
import { auth} from "../firebase/firebase"

const Posts = () => {
    const user = useContext(AuthContext);
    const {displayName, email} = user;

    return <>
    <h1>{displayName}</h1>
    <h3>{email}</h3>
    <button onClick={() => auth.signOut()}>Logout</button>
    </a>
}

export default Posts;