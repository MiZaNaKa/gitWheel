import React, { useEffect, useState } from "react";
import Delete from "./delete.png"
import Clear from "./clear.gif"
const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
function getCharacter(index) {
    return hexCharacters[index]
}

function generateNewColor() {
    let hexColorRep = "#"

    for (let index = 0; index < 6; index++){
      const randomPosition = Math.floor ( Math.random() * hexCharacters.length ) 
        hexColorRep += getCharacter( randomPosition )
    }
    
    return hexColorRep
}
const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  onRotate,
  onRotatefinish,
  primaryColor,
  primaryColoraround,
  contrastColor,
  buttonText,
  isOnlyOnce = true,
  size = 290,
  upDuration = 1000,
  downDuration = 100,
  fontFamily = "proxima-nova",
  width = 100,
  height = 100
}) => {
    
  const [tempoArray, setTempoArray] = useState(["Happy", "Angry", "Sad", "Frustration", "Emptyness"]);
  const [segColorsStore, setSegColor] = useState([
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    // "#34A24F",
    // "#F9AA1F",
    // "#EC3F3F",
    "#FF9000",
  ]);
  
  sessionStorage.setItem('segments', JSON.stringify(tempoArray));
  sessionStorage.setItem('segmentColor', JSON.stringify(segColorsStore));
  // var tempoArray=(["Happy", "Angry", "Sad", "Frustration", "Emptyness"]);
  
  
  let currentSegment = "";
  let isStarted = false;
  const [hee, setHee] = useState(false);
  const [text, setText] = useState("");
  const [isFinished, setFinished] = useState(false);
  
  const[pickerValue,setPickerValue]=useState([])
  const[color,setColor]=useState([])
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / `${segments.length}`;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = 300;
  const centerY = 300;
  var textString=""
  
  
  useEffect(() => {
    sessionStorage.setItem('segments', JSON.stringify([]));
    sessionStorage.setItem('segmentColor', JSON.stringify([]));
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
  };

  const spin = () => {
    isStarted = true;
    const segments11 = JSON.parse(sessionStorage.getItem('segments'));
    const segmentsCC = JSON.parse(sessionStorage.getItem('segmentColor'));

    if(segments11 && segments11.length>0){
        segments=segments11
        segColors=segmentsCC
    }
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };
  const onTimerTick = () => {
    frames++;
    draw();
    console.log(segments)
    console.log(segments)
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        if (progress >= 0.8) {
          angleDelta =
            (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else if (progress >= 0.98) {
          angleDelta =
            (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
      console.log(segments)
      console.log(segments)
    }
  };

  const wheelDraw = () => {

    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 5;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill();
    ctx.font = "bold 2em " + fontFamily;
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 25;
    ctx.strokeStyle = primaryColoraround || "white";
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fileStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 40);
    ctx.lineTo(centerX - 10, centerY - 40);
    ctx.lineTo(centerX, centerY - 60);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "transparent";
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };
  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };

  const hello=()=>{
    initCanvastt();
    wheelDraw()
    
    // const ctx = canvasContext;
    // let lastAngle = angleCurrent;
    // const len = segments.length;
    // const PI2 = Math.PI * 2;
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = primaryColor || "black";
    // ctx.textBaseline = "middle";
    // ctx.textAlign = "center";
    // ctx.font = "1em " + fontFamily;
    // for (let i = 1; i <= len; i++) {
    //   const angle = PI2 * (i / len) + angleCurrent;
    //   drawSegmentkkt(i - 1, lastAngle, angle);
    //   lastAngle = angle;
    // }
    
  }

  const initCanvastt = () => {
    let canvas = document.getElementById("canvas");
    console.log(canvas)
    console.log(navigator.appVersion.indexOf("MSIE"))
    console.log(canvas)
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    // canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
  };

  const AddAPI = () => {
//     var haha=JSON.parse(JSON.stringify(tempoArray));
//   var haha1=JSON.parse(JSON.stringify(segColorsStore));
//     console.log(haha)
//     console.log(haha)
    // segments=haha
    // segColors=haha1
    console.log(segments)
    var generateColor =generateNewColor()
    segments.push(text)
    console.log(segments)
    console.log(segments)
    setTempoArray(oldArray => [...oldArray, text]);
    setSegColor(oldArray => [...oldArray, generateColor]);
    // tempoArray.push(text)
    setText("")
    setHee(!hee);
    textString=""
    segColors.push(generateColor)
    hello()
    // wheelInit()
    clear();
    drawWheel();
    drawNeedle();
    

    
    
   }

  

  const textOnChange=(value)=>{
    textString=value.target.value
    setText(value.target.value)
  }

//   const DeleteAPI = (index) => {
//     var storeColor=segColors
//     tempoArray.splice(index,1)
//     storeColor.splice(index,1)
//     console.log(tempoArray)
//     console.log(storeColor)
//     segments=tempoArray
//     segColors=storeColor
    
//     hello()
//     // wheelInit()
//     clear();
//     drawWheel();
//     drawNeedle();
//     setHee(!hee);
//   }

    const DeleteAPI = (index) => {
        console.log(segments)
        console.log(segments)
        // segments=tempoArray
        segments.splice(index, 1) 
        segColors.splice(index,1)
        
        // wheelInit()
        
        
        tempoArray.splice(index,1)
        segColorsStore.splice(index,1)
        setHee(!hee);
        hello()
        // clear();
        // drawWheel();
        // drawNeedle();
        // setTempoArray((products) => products.filter((_, index) => index !== 0));
        // setSegColor((products) => products.filter((_, index) => index !== 0));
    }



  return (
    <div className='content clearfix'>
    <div className='rightBox'>
      <div style={{marginBottom:50}}>
        <h4>Created by khinlay.merryshall@gmail.com</h4>
      </div>
      <div>
        
        <input value={text}  onChange={textOnChange} className='inputBox'/>
        <p style={{paddingRight:20,margin:15}} onClick={AddAPI}>+</p>
        {/* <img onClick={clearAllAPI} src={Clear} className='deleteImage' style={{width:25,height:25,marginLeft:15}}/> */}
      </div>
      {tempoArray.map((value,index)=>{
        return <div>

            <h3 key={index}>{value}
            <img onClick={()=>DeleteAPI(index)} src={Delete} className='deleteImage' style={{width:25,height:25}}/>
            </h3>
            
          </div>
        
      })}

      {/* {segments.map((value,index)=>{
        return <h1>{value}</h1>
      })} */}


      
      

    </div>
    <div className='leftBox'>
      <canvas
        id="canvas"
        width="600"
        height="600"
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto"
        }}
      />
    </div>

    

  </div>
    // <div>
    //     <input onChange={textOnChange} className="inputBox" />
    //   <canvas
    //     id="canvas"
    //     width="600"
    //     height="600"
    //     style={{
    //       pointerEvents: isFinished && isOnlyOnce ? "none" : "auto"
    //     }}
    //   />

    //   {segments.map((value,index)=>{
    //     return <h1>{value}</h1>
    //   })}
    // </div>
  );
};
export default WheelComponent;
