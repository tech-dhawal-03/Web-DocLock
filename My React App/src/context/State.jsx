import React,{useState} from "react";
import Context from "./Context";

const State= (props) =>{

    const[user_data,setUser_data] = useState("");

    
    
    return(
        <Context.Provider value={{user_data,setUser_data}}>
            {props.children}
        </Context.Provider>
    )


}

export default State;