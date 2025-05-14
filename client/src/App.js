import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from "./components/Home";
import Goal from './components/Goal';
import Beach from './components/Beach';
import Cities from './components/Cities';
import Forest from './components/Forest';
import Detail from './components/Detail';
import Snowmountains from './components/Snowmountains';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setCurrentUser(user);
            setLoading(false);
          });
        } else {
          localStorage.removeItem("token");
          setLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/explore/beaches" element={<Beach currentUser={currentUser} />} />
        <Route path="/explore/cities" element={<Cities currentUser={currentUser} />} />
        <Route path="/explore/forests" element={<Forest currentUser={currentUser} />} />
        <Route path="/explore/snowmountains" element={<Snowmountains currentUser={currentUser} />} />
        <Route path="/goals" element={<Goal currentUser={currentUser} />} />
        <Route path="/explore/beaches/:id" element={<Detail currentUser={currentUser} />} />
        <Route path="/explore/forests/:id" element={<Detail currentUser={currentUser} />} />
        <Route path="/explore/cities/:id" element={<Detail currentUser={currentUser} />} />
        <Route path="/explore/snowmountains/:id" element={<Detail currentUser={currentUser} />} />
      </Routes>
    </>
  );
}

export default App;
