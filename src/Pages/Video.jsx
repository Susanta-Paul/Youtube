import "./Video.css"
import {useState, useMemo, useEffect} from "react"
import ReactPlayer from "react-player"
import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { GoDownload } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function Video(props){

  document.title="Video"
  

  const [like, setLike]=useState(false)
  const [dislike, setDislike]=useState(false)
  const [saved, setSaved]=useState(false)
  const [p, setP]=useState("https://g2.img-dpreview.com/2E3F787848C541C3BB196015762B1CFD.jpg")
  const [sub, setSub]=useState(900)
  const API=props.api
  const {id}=useParams()
  // const [vidinfo, setVidinfo]=useState()
  const [vidinfo, setVidinfo]=useState({
    "kind": "",
    "etag": "",
    "id": "",
    "snippet": {
        "publishedAt": "",
        "channelId": "",
        "title": "",
        "description": "",
        
        "channelTitle": "",
        "tags": [],
        "categoryId": "",
        "liveBroadcastContent": "none",
        "localized": {
            "title": "",
            "description": ""
        },
        "defaultAudioLanguage": "te"
    },
    "contentDetails": {
        "duration": "",
        "dimension": "",
        "definition": "",
        "caption": "",
        "licensedContent": true,
        "contentRating": {},
        "projection": ""
    },
    "statistics": {
        "viewCount": "0",
        "likeCount": "0",
        "favoriteCount": "0",
        "commentCount": "0"
    }
})

  function handlelike(){setLike(l=>!l)}
  function handledislike(){setDislike(d=>!d)}
  function handlesave(){setSaved(s=>!s)}

  function formatNumber(num) { 
    if (num === undefined || num === null) { return '0';}

    if (num >= 1_000_000) { return (num / 1_000_000).toFixed(1) + 'M'; 
  } else if (num >= 1_000) {
     return (num / 1_000).toFixed(1) + 'K'; 
    } else { return num.toString(); } }

  useEffect(()=>{
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API}`)
    .then(response=> response.json())
    .then(result=>{
      setVidinfo(result.items[0])
    }
    )
  },[])

  useEffect(()=>{
    fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${vidinfo.snippet.channelId}&key=${API}`)
    .then(response=> response.json())
    .then(result=>{
      setP(result.items[0].snippet.thumbnails.medium.url);
      setSub(result.items[0].statistics.subscriberCount);
    }
      )
  },[vidinfo])


  return (
    <>
      <div className="video-page">
        <div className="video-play">
          <ReactPlayer height="100%" width="100%" controls url={`https://www.youtube.com/embed/${id}`}
            style={{ borderRadius: "10px"}} 
           />
        </div>
        <div className="information">
          <h3 id="titl">{vidinfo.snippet.title}</h3>
          <div className="all-likes-sub">
            <div className="subscribe">
              <img src={p} />
              <div className="channel-info">
                <b>{vidinfo.snippet.channelTitle}</b>
                <p id="sub-count">{formatNumber(sub)} Subscribers</p>
              </div>
              <button> <b> Subscribe</b></button>
            </div>
            <div className="likes">
              <button onClick={handlelike} className="function-icons">
                {like?(<BsFillHandThumbsUpFill style={{fontSize: "20px", color: "white"}} /> ):( <GoThumbsup style={{fontSize: "20px"}} /> )}
                <b> {formatNumber(vidinfo.statistics.likeCount)} </b>  </button>
              <button onClick={handledislike} className="function-icons">
                {dislike?(<BsFillHandThumbsDownFill style={{fontSize: "20px", color: "white"}} />)
                :(<GoThumbsdown style={{fontSize: "20px"}} />)}
                </button>
              <button className="function-icons"><RiShareForwardLine style={{fontSize: "20px"}}/> <b>Share</b> </button>
              <button className="function-icons"><GoDownload style={{fontSize: "20px"}}/> <b>Download</b> </button>
              <button onClick={handlesave} className="function-icons">
                {saved? (<FaBookmark style={{fontSize: "20px", color: "white"}} /> ):(<CiBookmark style={{fontSize: "20px"}} /> )}
                <b>Save</b> </button>
            </div>
          </div>
        </div>
        <div className="description"></div>
      </div>
    </>
  )
}