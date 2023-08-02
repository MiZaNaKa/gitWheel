import React, {  useEffect,useState,fetchData} from 'react';

import WheelComponent from 'react-wheel-of-prizes'
import './App.css'

const App = () => {
  const[userInfo,setUserInfo]=useState('')
  const[text,setText]=useState('')
  const[pickerValue,setPickerValue]=useState(['1','2','3'])
  const[color,setColor]=useState(['red','green','pink'])
  useEffect(() => {
    // fetchData();
  }, [pickerValue,color])


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
    console.log(winner)
    setUserInfo(winner)

    var value =generateNewColor()
    console.log(value)
    console.log(value)

    console.log(generateNewColor())
    console.log(generateNewColor())
  }

  const AddAPI = () => {
    setText("")
    setPickerValue([...pickerValue, text]);
    var value =generateNewColor()
    setColor([...color, value]);
  }

  const textOnChange=(value)=>{
    var tempoTex=text+value.nativeEvent.data
    setText(tempoTex)
  }
  return (
    <div className='content clearfix'>
      <div className='leftBox'>
        <WheelComponent
          segments={pickerValue}
          segColors={color}
          winningSegment={userInfo}
          onFinished={(winner) => onFinished(winner)}
          primaryColor='black'
          contrastColor='white'
          buttonText='Spin'
          isOnlyOnce={false}
          size={290}
          upDuration={90}
          downDuration={350}
          fontFamily='Arial'
        />
      </div>

      <div className='rightBox'>
        <div>
          <input value={text} onChange={textOnChange} className='inputBox'/>
          <p onClick={AddAPI}>+</p>
        </div>
        {pickerValue.map((value,index)=>{
          return<h1 key={index}>{value}</h1>
        })}
        

      </div>

    </div>
    
  )
}

export default App