import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './MainComponent.css'

const MainComponent = () => {
    const [totalCurrencyNotes,setTotalCurrencyNotes] = useState('')
    const [fromDataValue,setFromDataValue] = useState('')
    const [toDataValue,setToDataValue] = useState('')
    const [convertedValue,setConvertedValue] = useState(0)
    const [listOfData,setListOfData] = useState([])
    const handleInput = (event)=>
    {
        setTotalCurrencyNotes(event.target.value)   
        console.log(totalCurrencyNotes)
    }
    const fromData = (event) =>
    {
        setFromDataValue(event.target.value)
        console.log(fromDataValue)
    }
    const toData = (event)=>
    {
        setToDataValue(event.target.value)
        console.log(toDataValue)
    }
    const fetchData = ()=>
    {
        axios.post(`http://localhost:3500/api/v1/currency/from/${fromDataValue}/to/${toDataValue}`, {NumberOfNotes : totalCurrencyNotes})
        .then((response)=>{
            setConvertedValue(response.data)
            console.log(convertedValue.expectedCurrencyValue)
        })
        .catch((error)=>console.log(error))
    }
    useEffect(()=>{
        axios.get('http://localhost:3500/api/v1/currency')
        .then((response)=>{
            console.log(response.data)
            setListOfData(response.data)
            
        })
        .catch((error)=>console.log(error))
    },[])
  return (
    <React.Fragment>
        <div className ='Header'>Currency Converter</div>
        <br />
        <br />
        <input
            className='text-container'
            type = 'text'
            value = {totalCurrencyNotes}
            onChange={handleInput}
            />
        <select name="" className='dropdown-menu' onChange={fromData}>
            <option value="Select">Select</option>
            {listOfData && listOfData.map( (iterator)=>(
                <option key = {iterator._id} value = {iterator.code} >{iterator.code}</option>
            ))}  
        </select> 
        <input
            className='text-container'
            type = 'text'
            value = {convertedValue.expectedCurrencyValue}
            />
        <select name="" className='dropdown-menu' onChange={toData}>
            <option value="Select">Select</option>
            {listOfData && listOfData.map( (iterator)=>(
                <option key = {iterator._id} value = {iterator.code}>{iterator.code}</option>
            ))}  
        </select> 
        <br/>
        <br /> <br />
        <button onClick={fetchData} className='convert-button'>convert</button>
    </React.Fragment>
  )
}

export default MainComponent