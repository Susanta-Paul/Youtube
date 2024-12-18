import { HiBars3 } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';
import { RiVideoAddLine } from 'react-icons/ri';
import '/src/Layout/Layout.css';
import Sidebar from './Sidebar.jsx';
import SearchCard from "/src/Components/SearchCard.jsx"
import Search from "/src/Pages/Search.jsx"
import {useState} from "react"
import Home from "/src/Pages/Home.jsx"
import Video from "/src/Pages/Video.jsx"
import {Outlet, NavLink, Navigate, useNavigate} from "react-router-dom"

export default function RootLayout(props) {

  const API=props.api
  const [query, setQuery]=useState("")
  const navigate=useNavigate()

  function handleSearch(){
    let n=query.trim()
    navigate(`/search/${n}`)
  }


  return (
    <>
      <div className="main">
        <div className="nav">
          <div className="logo">
            <HiBars3 id="bars" style={{ color: 'white', fontSize: 30 }} />
            <NavLink to="/" style={{color: "white", textDecoration: "none", display: "flex",
            alignItems: "center"
           }} >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/023/986/704/small_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png"
              alt="logo"
            />
            <h2>MyTube</h2>
            </NavLink>
          </div>
          <div className="search">
            <div id="s"></div>
            <input type="text" placeholder="Search"
              value={query}
              onChange={(e)=>{setQuery(e.target.value)}}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){handleSearch()}
              }}
             />
            <button onClick={handleSearch} id="srch">
              <IoIosSearch />
            </button>
          </div>
          <div className="acc">
            <RiVideoAddLine id="vdo" />
            <img
              src="https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg"
              alt="acc-logo"
            />
          </div>
        </div>
        <div className="body">
          <div className="side"><Sidebar/></div>
          {/* <div className="content"><Search api={API}/></div> */}
          {/* <div className="content"><Home api={API}/></div> */}
          {/* <div className="content"><Video api={API}/></div> */}
          <div className="content"><Outlet /></div>
        </div>
      </div>
    </>
  );
}
