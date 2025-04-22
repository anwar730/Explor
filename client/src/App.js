import NavBar from './components/NavBar';
import './App.css';
import Home from "./components/Home"
import Goal from './components/Goal';
import Beach from './components/Beach';
import Cities from './components/Cities';
import Forest from './components/Forest';
import { Routes ,Route } from "react-router-dom";

import Detail from './components/Detail';
import Snowmountains from './components/Snowmountains';

function App() {
  return (  
    <>
    <NavBar/>
    <Routes>
    <Route  exact path="/" element={<Home />}/>
    <Route exact path="/explore/beaches" element={<Beach/>} />
    <Route path='/explore/cities' element={<Cities/>}/>
    <Route exact path="/explore/forests" element={<Forest/>} />
    <Route exact path="/explore/snowmountains" element={<Snowmountains/>} />
    <Route exact path="/goals" element={<Goal />}/>
    <Route  path={`/explore/beaches/:id`} element={<Detail/>} />
    <Route  path={`/explore/forests/:id`} element={<Detail/>} />
    <Route  path={`/explore/cities/:id`} element={<Detail/>} />
    <Route  path={`/explore/snowmountains/:id`} element={<Detail/>} />
        {/* <Route path="/home">
          <Home/>
        </Route>
        <Route path="/explore">
          <Explore/>
        </Route>
        <Route path="/goal">
          <Goal/>
        </Route> */}
    </Routes>
    
    </>
  );
}

export default App;
