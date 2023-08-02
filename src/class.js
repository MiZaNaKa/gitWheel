import React, {  useEffect,useState,fetchData} from 'react';

import WheelComponent from 'react-wheel-of-prizes'
import './App.css'

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


export default class App extends React.Component {

    constructor(props) {
        super(props)    

        this.state={
           text:'',
           color:['red','blue','pink'],
           pickerValue:['1','2','3'],
           userInfo:''
        }
             
    }

    textOnChange=(value)=>{
      var tempoTex=this.state.text+value.nativeEvent.data
      this.setState({
        text:tempoTex
      })
    }

    AddAPI = () => {
      var total =this.state.pickerValue.push(this.state.text)
      this.setState({
        text:'',
        pickerValue:[...this.state.pickerValue+this.state.text]
      })
      
      // setPickerValue([...pickerValue, text]);
      // var value =generateNewColor()
      // setColor([...color, value]);
    }

    render() {
        return (
          <div className='content clearfix'>
          <div className='leftBox'>
            <WheelComponent
              segments={this.state.pickerValue}
              segColors={this.state.color}
              winningSegment={this.setState.userInfo}
              onFinished={(winner) => this.onFinished(winner)}
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
              <input value={this.state.text} onChange={this.textOnChange} className='inputBox'/>
              <p onClick={this.AddAPI}>+</p>
            </div>
            {this.state.pickerValue.map((value,index)=>{
              return<h1 key={index}>{value}</h1>
            })}
            
    
          </div>
    
        </div>
            
        )
    }
}
