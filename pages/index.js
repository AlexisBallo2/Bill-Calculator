import React, { useState, useEffect } from "react";
import Group from "./components/Group";
import styles from "../styles/index.module.css";

var groupsCounter = 3;

export default function Home() {
  const [data, setData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fullData, setfullData] = useState([]);

  var [groups, setGroups] = useState([{ id: 0 }, { id: 1 }]);

  const calculate = () => {
    setLoading(true);
    fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ days: fullData, costs: costData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  };

  const addEntry = (obj) => {
    setGroups((current) => [...current, { id: current.length }]);
  };
  const removeEntry = () => {
    setGroups((current) =>
      current.filter((obj) => {
        return obj.id !== current.length - 1;
      })
    );
  };

  const updaterFunction = (data) => {
    var currentData = fullData;
    var currentCostData = costData;
    currentCostData[data.number] = data.cost;
    setCostData(currentCostData);
    fullData[data.number] = data.value;
    setfullData(currentData);
    console.log("full data", currentData);
    console.log("costs", currentCostData);
  };

  return (
    <div className={styles.page}>
      <div className={styles.paymentCalcHeader}>Payment Calculator</div>
      <div className={styles.groupHolder}>
        {groups.map((item) => {
          return (
            <div key={item.id} className={styles.holder}>
              <Group id={item.id} updaterFunction={updaterFunction} />
            </div>
          );
        })}
      </div>
      <div className={[styles.holder, styles.buttons]}>
        <button onClick={() => addEntry()}>Add Group</button>
        <button onClick={() => removeEntry()}>Remove Group</button>
        {isLoading ? "loading" : data.name}
      </div>
      <button onClick={() => calculate()}>Calculate</button>
      <div>
        {data.length == 0
          ? ""
          : data.map((dat) => (
              <p key={dat}>
                Group {parseInt(dat[0]) + 1} pays Group {parseInt(dat[1]) + 1}:
                ${dat[2]}
              </p>
            ))}
      </div>
    </div>
  );
}