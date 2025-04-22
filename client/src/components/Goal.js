import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { FaTrashAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

import Footer2 from "./Footer2";

function Goal() {
  const [goals, setGoals] = useState([]);
  const [editGoalId, setEditGoalId] = useState(null);
  const [editMoney, setEditMoney] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://explorr.onrender.com/goals")
      .then((res) => res.json())
      .then((goals) => {
        setGoals(goals);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    const updatedGoal = goals.find((goal) => goal.id === editGoalId);
    if (updatedGoal) {
      updatedGoal.savedMoney = editMoney; // Only update savedMoney

      // Update goal locally in the state
      const updatedGoals = goals.map((goal) =>
        goal.id === editGoalId ? updatedGoal : goal
      );
      setGoals(updatedGoals);

      // Send the updated goal to the backend
      fetch(`https://explorr.onrender.com/goals/${editGoalId}`, {
        method: "PUT", // or "PATCH"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGoal), // Send only the updated goal
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      setEditGoalId(null);
      setEditMoney("");
    }
  }

  function handleClick(goal) {
    if (editGoalId === goal.id) {
      // If the same goal is clicked again, hide the form
      setEditGoalId(null);
    } else {
      // Show the form for the selected goal
      setEditGoalId(goal.id);
    }
  }

  function handleDelete(id) {
    fetch(`https://explorr.onrender.com/goals/${id}`, {
      method: "DELETE",
    });
    const filtered = goals.filter((goal) => goal.id !== id);
    setGoals(filtered);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-12 w-12 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      <section className="goals mb-8">
        <h1 className="text-3xl font-semibold text-center my-8">Goals</h1>
        <div className="goal-parent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {goals.length === 0 ? (
            <p>No goals found. Create a new goal!</p>
          ) : (
            goals.map((goal) => (
              <div
                className="beachcard p-6 rounded-lg shadow-lg bg-white"
                key={goal.id}
              >
                {/* Check if goal.todoDetail exists and has at least one element */}
                {goal.todoDetail && goal.todoDetail.length > 0 && goal.todoDetail[0].image ? (
                  <img
                    src={goal.todoDetail[0].image}
                    alt="beach Image"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <img
                    src="default-image-url.jpg" // Add a default image URL here
                    alt="Default"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}

                <h3 className="text-gray-600 mt-2">
                  Ksh {goal.savedMoney} out of {goal.totalmoney}
                </h3>
                <h2 className="text-xl font-semibold mt-2">{goal.goalName}</h2>
                <div className="goal-icons mt-2 text-sm text-gray-500">
                  <h4 className="font-bold">
                    <SlCalender className="icons inline-block mr-2" />
                    {goal.date}
                  </h4>
                  <h3 className="font-bold my-4">
                    <CiUser className="inline-block mr-2" />
                    {goal.groupNumber}
                  </h3>
                </div>
                <div className="goal-icons mt-4 flex justify-between">
                  <button
                    onClick={() => handleClick(goal)}
                    className="edit-btn text-blue-500 flex items-center"
                  >
                    Edit <CiEdit className="ml-1" />
                  </button>
                  <FaTrashAlt
                    className="icons text-red-500 cursor-pointer"
                    onClick={() => handleDelete(goal.id)}
                  />
                </div>

                {editGoalId === goal.id && (
                  <form className="edit-form mt-4">
                    <label className="block text-sm">Total money</label>
                    <input
                      type="number"
                      id="totalmoney"
                      onChange={(e) => setEditMoney(e.target.value)}
                      required
                      className="mt-2 p-2 border rounded w-full"
                    />
                    <button
                      type="submit"
                      className="edit-icon mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleSubmit}
                    >
                      Save <CiEdit className="ml-1 inline-block" />
                    </button>
                  </form>
                )}
              </div>
            ))
          )}
        </div>
      </section>
      <Footer2 />
    </>
  );
}

export default Goal;
