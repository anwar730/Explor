import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Make sure this import is present


function Form({currentUser}) {
  const { id } = useParams();
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate(); // This line is critical - it initializes the navigate function


  const [name,setName] = useState("");
  const [members_count, setMembersCount] = useState("");
  const [saved_money, setMoneySaved] = useState("");
  const [total_money, settotalmoney] = useState("");
  const [date, setdate] = useState("");
  const [goals, setGoals] = useState([]);
  const [messagebtn, setMessagebtn] = useState("Create goal");
  const [errors, setErrors] = useState([]);


  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    const formData = {
          name,
          members_count,
          todoDetail: [filtered],
          saved_money,
          total_money,
          date,
        };
    if (!currentUser) {
      alert("You must be logged in to create goal");
      navigate("/");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      navigate("/");
      return;
    }
  
    try {
      const response = await fetch(`https://explor.onrender.com/users/${currentUser.id}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setMessagebtn("Goal created successfully ✔");
        setName("");
        setMembersCount("");
        setMoneySaved("");
        settotalmoney("");
        setdate("");
        navigate("/goals");
      } else {
        const err = await response.json();
        setErrors(err.errors || ["Failed to create task."]);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  }
  useEffect(() => {
    fetch(`https://explor.onrender.com/users/${currentUser.id}/goals`)
      .then((res) => res.json())
      .then((goals) => setGoals(goals));
  }, []);

 

  function handleChange(e) {
    if (e.target.id === "goalname") {
      setName(e.target.value);
    } else if (e.target.id === "number") {
      setMembersCount(e.target.value);
    } else if (e.target.id === "moneySaved") {
      setMoneySaved(e.target.value);
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
            value={name}
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
            value={saved_money}
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
            value={total_money}
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
            value={members_count}
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
