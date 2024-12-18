import {useEffect, useState} from "react"
import SearchCard from "/src/Components/SearchCard.jsx"
import { useParams, NavLink } from "react-router-dom"

export default function Search(props){

  
  
  const {query}=useParams()
  const API=props.api
  const [videos, setVideos]=useState([])

  document.title=query

  useEffect(()=>{
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API}`)
    .then(response=> response.json())
    .then(result=>{
      // console.log(result.items)
      setVideos(result.items)
    })
  },[query])
  
  return(
    <>
      <div className="all-search-videos">
        {videos.filter(video => video.id.kind === "youtube#video").map((video, index)=>(
          <div key={index} >
            <SearchCard 
              title={video.snippet.title}
              channelid={video.snippet.channelId}
              thumbnail={video.snippet.thumbnails.high.url}
              name={video.snippet.channelTitle}
              video={video.id.videoId}
              api={API}
             />
          </div>
        ))}
      </div>
    </>
  )
}