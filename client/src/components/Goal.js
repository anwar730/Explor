import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { FaTrashAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer2 from "./Footer2";

function Goal({ currentUser }) {
  const [goals, setGoals] = useState([]);
  const [editGoalId, setEditGoalId] = useState(null);
  const [editMoney, setEditMoney] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    saved_money: 0,
    total_money: 0,
    date: "",
    members_count: 1
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:3000/users/${currentUser.id}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch goals");
        return r.json();
      })
      .then(data => {
        setGoals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching goals:", err);
        setLoading(false);
      });
  }, [currentUser, navigate]);
  
  function handleSubmit(e) {
    e.preventDefault();

    const updatedGoal = goals.find((goal) => goal.id === editGoalId);
    if (updatedGoal) {
      updatedGoal.saved_money = Number(editMoney);

      const updatedGoals = goals.map((goal) =>
        goal.id === editGoalId ? updatedGoal : goal
      );
      setGoals(updatedGoals);

      const token = localStorage.getItem('token');

      fetch(`http://localhost:3000/users/${currentUser.id}/goals/${editGoalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedGoal),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update goal");
          return res.json();
        })
        .then((data) => console.log("Goal updated:", data))
        .catch((error) => console.error("Error updating goal:", error));

      setEditGoalId(null);
      setEditMoney("");
    }
  }

  function handleClick(goal) {
    if (editGoalId === goal.id) {
      setEditGoalId(null);
    } else {
      setEditGoalId(goal.id);
      setEditMoney(goal.saved_money);
    }
  }

  function handleDelete(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/users/${currentUser.id}/goals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete goal");
        const filtered = goals.filter((goal) => goal.id !== id);
        setGoals(filtered);
      })
      .catch(error => console.error("Error deleting goal:", error));
  }

  function handleAddGoal(e) {
    e.preventDefault();
    
    if (newGoal.name && newGoal.total_money > 0) {
      const token = localStorage.getItem("token");
      
      fetch(`http://localhost:3000/users/${currentUser.id}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newGoal),
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to create goal");
          return res.json();
        })
        .then(data => {
          setGoals([...goals, data]);
          setNewGoal({
            name: "",
            saved_money: 0,
            total_money: 0,
            date: "",
            members_count: 1
          });
          setShowAddGoal(false);
        })
        .catch(error => console.error("Error creating goal:", error));
    }
  }

  function calculateProgress(saved, total) {
    return (saved / total) * 100;
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
    // Add flex and flex-col to make the page container take full height
    // Add min-h-screen to ensure it's at least as tall as the viewport
    <div className="flex flex-col min-h-screen">
      {/* Add flex-grow to make this section expand to fill available space */}
      <div className="flex-grow">
        <section className="goals container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">My Goals</h1>
            <button 
              onClick={() => setShowAddGoal(!showAddGoal)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {showAddGoal ? "Cancel" : "New Goal"}
              {showAddGoal ? null : <IoMdAdd size={20} />}
            </button>
          </div>

          {showAddGoal && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-medium mb-4">Create New Goal</h2>
              <form onSubmit={handleAddGoal}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                    <input 
                      type="text" 
                      value={newGoal.name} 
                      onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter goal name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (Ksh)</label>
                    <input 
                      type="number" 
                      value={newGoal.total_money || ""} 
                      onChange={(e) => setNewGoal({...newGoal, total_money: Number(e.target.value) || 0})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter target amount"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Savings (Ksh)</label>
                    <input 
                      type="number" 
                      value={newGoal.saved_money || ""} 
                      onChange={(e) => setNewGoal({...newGoal, saved_money: Number(e.target.value) || 0})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter initial savings"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      id="date"
                      onChange={(e) => setNewGoal({...newGoal, date: e.target.value})}
                      value={newGoal.date}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="number-dd" className="block text-sm font-medium text-gray-700 mb-1">
                      Members
                    </label>
                    <select
                      id="number"
                      onChange={(e) => setNewGoal({...newGoal, members_count: Number(e.target.value) || 1})}
                      value={newGoal.members_count}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
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
                <div className="mt-4 flex justify-end">
                  <button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                  >
                    Save Goal
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="goal-parent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.length === 0 ? (
              <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <IoMdAdd size={48} className="mx-auto" />
                </div>
                <p className="text-gray-600 mb-6">No goals found. Create your first goal!</p>
                <button 
                  onClick={() => setShowAddGoal(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md"
                >
                  Create a New Goal
                </button>
              </div>
            ) : (
              goals.map((goal) => (
                <div
                  className="beachcard rounded-lg shadow-lg bg-white overflow-hidden transform transition hover:shadow-xl hover:scale-102 self-start"
                  key={goal.id}
                >
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-3"></div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-3">{goal.name}</h2>
                    
                    <div className="mt-3 mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span className="font-medium">Ksh {Number(goal.saved_money).toLocaleString()} of {Number(goal.total_money).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-orange-500 h-2.5 rounded-full" 
                          style={{ width: `${calculateProgress(goal.saved_money, goal.total_money)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="goal-icons flex justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <SlCalender className="mr-2 text-orange-500" />
                        <span>{goal.date}</span>
                      </div>
                      <div className="flex items-center">
                        <CiUser className="mr-2 text-orange-500" size={18} />
                        <span>{goal.members_count}</span>
                      </div>
                    </div>
                    
                    <div className="goal-icons flex justify-between mt-6">
                      <button
                        onClick={() => handleClick(goal)}
                        className="edit-btn text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        Edit <CiEdit className="ml-1" size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(goal.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                      >
                        Delete <FaTrashAlt className="ml-1" size={16} />
                      </button>
                    </div>

                    {editGoalId === goal.id && (
                      <form className="edit-form mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200" onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Update Saved Amount (Ksh)</label>
                        <input
                          type="number"
                          value={editMoney}
                          onChange={(e) => setEditMoney(e.target.value)}
                          required
                          className="mt-1 p-2 border rounded-md w-full"
                        />
                        <button
                          type="submit"
                          className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
                        >
                          Save <CiEdit className="ml-2" size={18} />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      
      {/* Footer will now stick to the bottom */}
      <Footer2 />
    </div>
  );
}

export default Goal;