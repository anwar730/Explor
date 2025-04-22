import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

function Form() {
  const { id } = useParams();
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);

  const [goalName, setgoalName] = useState("");
  const [groupNumber, setgroupNumber] = useState("");
  const [savedMoney, setmoneySaved] = useState("");
  const [totalmoney, settotalmoney] = useState("");
  const [date, setdate] = useState("");
  const [goals, setGoals] = useState([]);
  const [messagebtn, setMessagebtn] = useState("Create goal");

  useEffect(() => {
    fetch("https://explorr.onrender.com/goals")
      .then((res) => res.json())
      .then((goals) => setGoals(goals));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      goalName,
      groupNumber,
      todoDetail: [filtered],
      savedMoney,
      totalmoney,
      date,
    };

    fetch(`https://explorr.onrender.com/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((goal) => setGoals([...goals, goal]));
    setMessagebtn("Goal created successfully ✔");
    setgoalName("");
    setgroupNumber("");
    setmoneySaved("");
    settotalmoney("");
    setdate("");
  }

  function handleChange(e) {
    if (e.target.id === "goalname") {
      setgoalName(e.target.value);
    } else if (e.target.id === "number") {
      setgroupNumber(e.target.value);
    } else if (e.target.id === "moneySaved") {
      setmoneySaved(e.target.value);
    } else if (e.target.id === "totalmoney") {
      settotalmoney(e.target.value);
    } else if (e.target.id === "date") {
      setdate(e.target.value);
    }
  }

  useEffect(() => {
    const resourceType = location.pathname.split("/")[2]; // This will give you 'beaches', 'forests', 'mountains', etc.
    fetch(`https://explorr.onrender.com/${resourceType}/${id}`)
      .then((res) => res.json())
      .then((data) => setFiltered(data));
  }, [id, location.pathname]);

  return (
    <form className="savecard max-w-lg mx-auto p-6 shadow-lg bg-white rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center mb-6">Save for a trip</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Name of the goal</label>
          <input
            type="text"
            name="goalname"
            id="goalname"
            onChange={handleChange}
            value={goalName}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Saved Money</label>
          <input
            type="number"
            id="moneySaved"
            onChange={handleChange}
            value={savedMoney}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Total money</label>
          <input
            type="number"
            id="totalmoney"
            onChange={handleChange}
            value={totalmoney}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Date</label>
          <input
            type="date"
            id="date"
            onChange={handleChange}
            value={date}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="number-dd" className="block text-lg font-medium mb-2">
            <b>Number of members in the group</b>
          </label>
          <select
            id="number"
            onChange={handleChange}
            value={groupNumber}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Number</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
      </div>

      <button className="save-btn w-full py-3 mt-6 bg-[#FB8500] text-white font-semibold rounded-md hover:bg-[#FB6A00]" type="submit">
        {messagebtn}
      </button>
    </form>
  );
}

export default Form;
