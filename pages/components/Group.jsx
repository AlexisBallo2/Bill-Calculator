import React, {useState, useEffect} from "react";
import Entry from "./Entry";
import styles from "../../styles/Group.module.css"

var itemCounter = 3;

export default function Group(props) {

 
    var [items, setItems] = useState([{id:0}, {id:1}])
    var [content, setContent] = useState([])
    var [cost, setCost] = useState(0)
  
    //add person to group
    const addEntry = obj => {
        setItems(current => [...current, {id:current.length}]);
        console.log('items' , items)
        console.log('content', content)
  };
    
    //remove person from group
    const removeEntry = () => {
    setItems(current =>
      current.filter(obj => {
        return obj.id !== current.length-1;
      }),
    );
  };

    //update current groups people
    const updaterFunction = (data) => {
        var currentData = content;
        currentData[data.number] = data.value
        setContent(currentData)
        console.log("passing currentData", currentData)
        props.updaterFunction({number: props.id, value: currentData, cost: cost})
        console.log("content dat" , content)
    }

    const setCostChange = e => {
        setCost(e.target.value)
    }
    return (
        <div className={styles.group}>
            <div>
             {items.map(item => {
                return (
                    <div key={item.id}>
                     <Entry updater = {updaterFunction} number = {item.id} />
                    </div>
                );
            })}
            <input value = {cost} onChange = {setCostChange}></input>
                <button onClick={() => addEntry()}>+</button>
                 <button onClick={() => removeEntry()}>-</button>
            </div>
        </div>
    )
}

