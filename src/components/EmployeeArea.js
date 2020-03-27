/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import EmpTable from "./EmployeeTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../Styles/EmpArea.css";
import DataArea from "../utils/Data";

const EmployeeArea = () => {
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: "descend",
    filteredUsers: [],
    headings: [
      { name: "Image"},
      { name: "name" },
      { name: "cell"},
      { name: "phone"},
      { name: "email"},
      { name: "dob"}
    ]
  });

  const handleSort = heading => {
    let currentOrder = developerState.headings
      .filter(elem => elem.name === heading)
      .map(elem => elem.order)
      .toString();

    if (currentOrder === "descend") {
      currentOrder = "ascend";
    } else {
      currentOrder = "descend";
    }

    const compareFnc = (a, b) => {
      if (currentOrder === "ascend") {
        console.log(heading)
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else if (heading === "dob") {
          return a[heading].age - b[heading].age;
        } else {
          return a[heading].localeCompare(b[heading]);
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        }else if (heading === "dob") {
          return b[heading].age - a[heading].age;
        }  else {
          return b[heading].localeCompare(a[heading]);
        }
      }
    };
    const sortedUsers = developerState.filteredUsers.sort(compareFnc);
    const updatedHeadings = developerState.headings.map(elem => {
      elem.order = elem.name === heading ? currentOrder : elem.order;
      return elem;
    });

    setDeveloperState({
      ...developerState,
      filteredUsers: sortedUsers,
      headings: updatedHeadings
    });
  };

  const handleSearchChange = event => {
    const filter = event.target.value;
    const filteredList = developerState.users.filter(item => {
      let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
    if(values.indexOf(filter.toLowerCase()) !== -1){
      return item
    };
    });

    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

  useEffect(() => {
    API.getUsers().then(results => {
      // console.log(results.data.results);
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }, [developerState]);

  return (
    <DataArea.Provider
      value={{ developerState, handleSearchChange, handleSort }}
    >
      <Nav />
      <div className="data-area">
        {developerState.filteredUsers.length > 0 ? <EmpTable /> : <div></div>}
      </div>
    </DataArea.Provider>
  );
};

export default EmployeeArea;