import "./HomeCard.css"

export default function HomeCard(props){

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
      <div className="home-card">
        <div className="thumb">
          <img src={props.thumbnail} alt="Video Thumbnail" />
          <div id="duration"> {convert(props.duration)} </div>
        </div>
        <div className="content-info">
          <div className="pp">
            <img src="https://g2.img-dpreview.com/2E3F787848C541C3BB196015762B1CFD.jpg" />
          </div>
          <div className="allinfo">
            <h3>{props.title}</h3>
            <p className="diff" style={{marginTop:"10px"}} >{props.channelName}</p>
            <p className="diff" style={{fontSize: "14px"}}>100M views ·10 Months ago</p>
          </div>
        </div>
      </div>
    </>
  )
}