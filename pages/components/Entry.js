import React, {useState} from "react";
import styles from "../../styles/Group.module.css"

export default function Entry(props) {
    const [value,setValue] = useState("");
    var number = props.number;
    const handleChange = e => {
        setValue(e.target.value)
        props.updater({number:number, value: e.target.value})
    }
    return(
        <div>
            <input value = {value} onChange = {handleChange}></input>
        </div>
    )
}