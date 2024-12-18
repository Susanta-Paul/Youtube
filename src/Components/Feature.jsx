import "/src/Components/Feature.css"

export default function Feature(props){
  return(
    <>
      <div className="feature">
        <div id="in">
          <div className="icon"> {props.icon} </div>
          <div className="name">{props.nam}</div>
        </div>
      </div>
    </>
  )
}