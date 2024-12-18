import { useState } from 'react';
import '/src/Layout/Sidebar.css';
import Feature from '/src/Components/Feature.jsx';
import { IoMdHome } from 'react-icons/io';
import { LuHistory } from 'react-icons/lu';
import { CgPlayList } from 'react-icons/cg';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { GoClock } from 'react-icons/go';
import { GoThumbsup } from 'react-icons/go';
import { GoDownload } from 'react-icons/go';
import { BiSolidVideos } from "react-icons/bi";
import { PiGreaterThanLight } from 'react-icons/pi';
import {NavLink} from "react-router-dom"

export default function Sidebar() {
  const [fea, setFea] = useState([
    { icon: <IoMdHome />, nam: 'Home', to:"/" },
    { icon: <BiSolidVideos />, nam: 'Subcriptions', to:"" },
    { icon: '', nam: null },
    { icon: <LuHistory />, nam: 'History', to:"" },
    { icon: <CgPlayList />, nam: 'Playlists', to:"" },
    { icon: <MdOutlineOndemandVideo />, nam: 'Your Videos', to:"" },
    { icon: <GoClock />, nam: 'Watch Later', to:"" },
    { icon: <GoThumbsup />, nam: 'Liked Videos', to:"" },
    { icon: <GoDownload />, nam: 'Downloads', to:"" },
  ]);

  return (
    <>
      <div className="sidebar">
        <div className="mini">
          {fea.map((elem, index) => (
            <div key={index}>
              {elem.nam !== null ? (
                <NavLink to={`${elem.to}`} style={{color: "white", textDecoration: "none",}} 
                className={({ isActive }) => (isActive ? "active" : "")}
                 >
                <Feature icon={elem.icon} nam={elem.nam} /></NavLink>
              ) : (
                <>
                  <hr />
                  <br />
                  <div
                    style={{ display: 'flex', alignItems: 'center', padding: 8 }}
                  >
                    <p>You</p> <PiGreaterThanLight id="sym" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <hr/>
      </div>
    </>
  );
}
