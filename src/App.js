import React, {  useEffect,useState} from 'react';
import Delete from "./delete.png"
import Clear from "./clear.gif"
import WheelComponent from 'react-wheel-of-prizes'
import './App.css'

const App = () => {
  const[userInfo,setUserInfo]=useState('')
  const[text,setText]=useState('')
  const[pickerValue,setPickerValue]=useState([])
  const[color,setColor]=useState([])
  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem('items'));

    const color = JSON.parse(sessionStorage.getItem('color'));
    
    if(items){
      setPickerValue(items)
    }
    else{
      sessionStorage.setItem('items', JSON.stringify(pickerValue));
    }

    if(color){
      setColor(color)
    }
    else{
      sessionStorage.setItem('color', JSON.stringify(color));
    }
    
    
  },[])


  const segments = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher'
  ]
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
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

  const onFinished = (winner) => {
    
    alert("winner is " +winner)
    setUserInfo(winner)

    var value =generateNewColor()
  }

  const AddAPI = () => {
   var old=pickerValue
   
   old.push(text)
   
    setText("")
    setPickerValue(old);
    var value =generateNewColor()
    
    var oldColor=color
    oldColor.push(value)
    setColor(oldColor);
    sessionStorage.setItem('color', JSON.stringify(color));
    sessionStorage.setItem('items', JSON.stringify(pickerValue));
    window.location.reload()
  }

  const DeleteAPI = (index) => {
    pickerValue.splice(index, 1) 
    color.splice(index,1)
    setPickerValue(pickerValue);
    setColor(color)
    sessionStorage.setItem('items', JSON.stringify(pickerValue));
    sessionStorage.setItem('color', JSON.stringify(color));
    window.location.reload()
  }

  const clearAllAPI = (index) => {
   
    sessionStorage.setItem('items', JSON.stringify([]));
    sessionStorage.setItem('color', JSON.stringify([]));
    window.location.reload()
  }


  

  

  const textOnChange=(value)=>{
    
    setText(value.target.value)
  }
  return (
    <div className='content clearfix'>
      <div className='rightBox'>
        <div style={{marginBottom:50}}>
          <h4>Created by khinlay.merryshall@gmail.com</h4>
        </div>
        <div>
          <input value={text} onChange={textOnChange} className='inputBox'/>
          <p style={{paddingRight:20,margin:15}} onClick={AddAPI}>+</p>
          <img onClick={clearAllAPI} src={Clear} className='deleteImage' style={{width:25,height:25,marginLeft:15}}/>
        </div>
        {pickerValue.map((value,index)=>{
          return <div>

              <h1 key={index}>{value}
              <img onClick={()=>DeleteAPI(index)} src={Delete} className='deleteImage' style={{width:25,height:25}}/>
              </h1>
              
            </div>
          
        })}


        
        

      </div>
      <div className='leftBox'>
        <WheelComponent
          segments={sessionStorage.getItem('items') ? JSON.parse(sessionStorage.getItem('items')) :[]}
          segColors={sessionStorage.getItem('color') ? JSON.parse(sessionStorage.getItem('color')) :[]}
          winningSegment={userInfo}
          onFinished={(winner) => onFinished(winner)}
          primaryColor='black'
          contrastColor='white'
          buttonText='Spin'
          isOnlyOnce={false}
          size={270}
          upDuration={290}
          downDuration={350}
          fontFamily='Arial'
        />
      </div>

      

    </div>
    
  )
}

export default App