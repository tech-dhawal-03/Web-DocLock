import React,{useState} from "react";
import Context from "./Context";

const State= (props) =>{

    const[user_data,setUser_data] = useState("");
    const[user_id,setUser_Id]=useState();
    const[person,setPerson] = useState({

        email : "",
        username : "",
        password : ""
    })

    
    
    return(
        <Context.Provider value={{
            user_data,setUser_data,
            user_id,setUser_Id,
            person,setPerson
            }}>
            {props.children}
        </Context.Provider>
    )


}

export default State;