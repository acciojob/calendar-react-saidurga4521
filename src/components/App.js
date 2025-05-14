import React, { useState } from "react";
import "../styles/App.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const App = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [isEditable, setIsEditable] = useState(false);
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  const handleNextYear = () => {
    setYear(year + 1);
  };
  const handlePrevYear = () => {
    setYear(year - 1);
  };
  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };
  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  const days = [];
  let totaldays = getDaysInMonth(month, year);
  let day = getDayOfMonth(month, year);
  console.log(day);
  for (let i = 0; i < day; i++) {
    console.log(i);
    days.push(<td key={`empty-${i}`}></td>);
  }
  for (let i = 1; i <= totaldays; i++) {
    days.push(<td key={`day-${i}`}>{i}</td>);
  }
  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    console.log(days.slice(i, i + 7));
    rows.push(<tr key={`row-${i / 7}`}>{days.slice(i, i + 7)}</tr>);
  }
  return (
    <div id="main">
      <h1>Calendar</h1>
      <select
        value={month}
        onChange={(e) => {
          setMonth(parseInt(e.target.value));
        }}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      {isEditable ? (
        <input
          id="year-input"
          type="number"
          value={year}
          onChange={(e) => {
            setYear(parseInt(e.target.value));
          }}
          onBlur={() => setIsEditable(false)}
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => {
            setIsEditable(true);
          }}
        >
          {year}
        </span>
      )}

      <div>
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <button id="prev-year-btn" onClick={handlePrevYear}>
        {"<<"}
      </button>
      <button id="prev-month-btn" onClick={handlePrevMonth}>
        {"<"}
      </button>
      <button id="next-month-btn" onClick={handleNextMonth}>
        {">"}
      </button>
      <button id="next-year-btn" onClick={handleNextYear}>
        {">>"}
      </button>
    </div>
  );
};

export default App;
