import React, {useState} from 'react';
import Group from "./components/Group";
import styles from  "../styles/index.module.css"

var groupsCounter = 3;

export default function Home() {

    var [groups, setGroups] = useState([{id:0}, {id:1}])
    const [fullData, setfullData] = useState([])
    
    const addEntry = obj => {
        setGroups(current => [...current, {id:current.length}]);

  };
    const removeEntry = () => {
      setGroups(current =>
        current.filter(obj => {
          return obj.id !== current.length-1;
        }),
      );
  };

   const updaterFunction = (data) => {
        var currentData = fullData;
        fullData[data.number] = data.value
        setfullData(currentData)
        console.log("full data", currentData)
    }

  return (
    <div>
      {groups.map(item => {
                return (
                    <div key={item.id} className = {styles.holder}>
                      <Group id = {item.id} updaterFunction = {updaterFunction} />
                    </div>
                );
            })}
            <div className={[styles.holder, styles.buttons]}>
                <button onClick={() => addEntry()}>Add Group</button>
                <button onClick={() => removeEntry()}>Remove Group</button>
            </div>
    </div>
    )
}