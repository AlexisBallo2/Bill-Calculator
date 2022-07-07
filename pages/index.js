import React, { useState, useEffect } from "react";
import Group from "./components/Group";
import styles from "../styles/index.module.css";
import Swal from "sweetalert2";
import Image from "next/image";

var groupsCounter = 3;

export default function Home() {
  const [data, setData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fullData, setfullData] = useState([]);
  const [popupShow, setpopupShow] = useState(true);
  var [groups, setGroups] = useState([{ id: 0 }, { id: 1 }]);

  if (popupShow) {
    setpopupShow(false);
    Swal.fire({
      title: "Advanced Payment Calculator",
      text: 'Enter family members in the "Name" column, and the amount of days they were there in the "Days" column. Enter the amount that the family/group spend for the group in the "Family Paid" box. Then press calculate!',
      // This app is intended to be used as a platform to calculate "who pays who what". This app was inspired by watching family members struggle to calculate the amount of $ owed after family vacations.
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }

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
      <div className={styles.buttons}>
        <button onClick={() => addEntry()}>Add Group</button>
        <button onClick={() => removeEntry()}>Remove Group</button>
        <button onClick={() => calculate()}>Calculate</button>
      </div>

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
      <div className={styles.aboutMe}>
        by{" "}
        <a
          href="https://alexisballo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alexis Ballo
        </a>
      </div>
      <div className={styles.question}>
        <img
          className={styles.image}
          src="https://static.vecteezy.com/system/resources/previews/006/253/524/original/outline-question-mark-icon-free-vector.jpg"
          width="30px"
          height="30px"
        />
      </div>
    </div>
  );
}
