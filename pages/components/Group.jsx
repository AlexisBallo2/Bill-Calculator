import React, { useState, useEffect } from "react";
import Entry from "./Entry";
import styles from "../../styles/Group.module.css";

var itemCounter = 3;

export default function Group(props) {
  console.log("getting data: ", props.data, " with length: ", props.data.length)
  var [items, setItems] = useState([]);
  useEffect(() => {
    var currentItems = [];
    console.log("updating items: ", items, " length: ", props.data.length )
    for(var i = 0; i < props.data.length; i++) {
      var tempObj = {id: i}
      currentItems.push(tempObj)
    }
    setItems(currentItems);
    console.log("new items: ", items)
  
    return () => {
      
    }
  }, [props.data.length])
  

  var [content, setContent] = useState(props.data);
  var [cost, setCost] = useState(props.payment);

  //add person to group
  const addEntry = (obj) => {
    setItems((current) => [...current, { id: current.length }]);
    console.log("items", items);
    console.log("content", content);
  };

  //remove person from group
  const removeEntry = () => {
    setItems((current) =>
      current.filter((obj) => {
        return obj.id !== current.length - 1;
      })
    );
  };

  //update current groups people
  const groupsUpdaterFunction = (data) => {
    var currentData = content;
    currentData[data.number] = data.value;
    setContent(currentData);
    console.log("passing currentData", currentData);
    props.updaterFunction({ number: props.id, value: currentData, cost: cost });
    console.log("content dat", content);
  };

  const setCostChange = (e) => {
    setCost(e.target.value);
    props.updaterFunction({
      number: props.id,
      value: content,
      cost: e.target.value,
    });
  };
  return (
    <div className={styles.group}>
      <h1 className={styles.groupHeader}> Group {props.id + 1}</h1>
      <div className={styles.headers}>
        <span>Name</span> <span>Days</span>
      </div>
      <div>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <div>
                <Entry updater={groupsUpdaterFunction} number={item.id} data = {props.data[item.id]} />
              </div>
            </div>
          );
        })}
        <div className={styles.costbuttonHolder}>
          <button onClick={() => addEntry()}>+</button>
          <button onClick={() => removeEntry()}>-</button>
        </div>
        <div className={styles.costbuttonHolder}>
          <span className={styles.costText}> Family Paid:</span>
          <input
            value={cost}
            onChange={setCostChange}
            className={styles.costInput}
          ></input>
        </div>
      </div>
    </div>
  );
}
