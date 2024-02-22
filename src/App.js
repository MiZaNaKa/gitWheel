import './App.css'
import React, { useEffect, useState } from "react";
import WheelComponent from "./WheelComponentNew";
export default function App() {
  const [winner, setWinner] = useState("");
  let segments = ["Happy", "Angry", "Sad", "Frustration", "Emptyness"];
  let segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    // "#34A24F",
    // "#F9AA1F",
    // "#EC3F3F",
    "#FF9000",
  ];
  const segments11 = JSON.parse(sessionStorage.getItem('segments'));
  const segmentsCC = JSON.parse(sessionStorage.getItem('segmentColor'));

  console.log(segments11)
  console.log(segments11)
  
 
  if(segments11 && segments11.length>0){
    segments=segments11
    segColors=segmentsCC
  }
  const onFinished = (winner) => {
    console.log(winner);
    alert("Winner is "+winner)
   
    setWinner("Winner is "+winner)
  };

//   const textOnChange = (value) => {
//     alert("hello");
//     console.log(value.target.value);
//     segments.push(value.target.value);
//   };

  return (
    <div className="App">
      
      <div id="wheelCircle">
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment=""
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          primaryColoraround="#ffffffb4"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={50}
          downDuration={2000}
        />
      </div>
      
    </div>
  );
}
