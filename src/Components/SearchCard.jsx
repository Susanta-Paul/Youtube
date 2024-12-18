import { useEffect, useState } from "react"
import "./SearchCard.css"
import { useParams, NavLink } from "react-router-dom"

export default function SearchCard(props){
  let id=props.channelid
  let video=props.video
  const [dur, setDur]=useState("PT21M3S")
  const API=props.api

  const [pic, setPic]= useState('')

  useEffect(()=>{
    fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API}`)
    .then(response=> response.json())
    .then(result=>{
      // console.log(result)
      // console.log(result.items[0].snippet.thumbnails.medium.url)
      setPic(result.items[0].snippet.thumbnails.medium.url)
    }
      )
  },[video, id])

  useEffect(()=>{
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video}&key=${API}`)
    .then(response=> response.json())
    .then(result=>{
      // console.log(result.items.contentDetails.duration);
      setDur(result.items[0].contentDetails.duration);
    }
      )
  },[video , id])


  function convert(duration) {
    const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = duration.match(regex);
  
    const hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
    const minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;
    const seconds = matches[3] ? parseInt(matches[3].replace('S', '')) : 0;
  
    // Format hours, minutes, and seconds to ensure two digits
    const formattedHours = hours > 0 ? String(hours).padStart(2, '0') : '';
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    // Format time as HH:MM:SS
    const formattedTime = hours>0 ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`:
    `${formattedMinutes}:${formattedSeconds}`
  
    return formattedTime;
  }

  return (
    <>
      <NavLink to={`/video/${video}`} style={{color: "white", textDecoration: "none"}} >
        <div className="card">
          <div className="thumbnail">
            <img src={props.thumbnail} alt="Thumbnail" />
            <div className="time"> <b> {convert(dur)}</b></div>
          </div>
          <div className="info">
            <h4 id="title">{props.title}</h4>
            <div id="views"> <p style={{margin: 0, padding: 0}}>100M Views · 10 month ago</p> </div>
            <div id="channel">
              <img src={pic} alt="Channel Logo" />
              {props.name}</div>
          </div>
        </div>
      </NavLink>
    </>
  )
}