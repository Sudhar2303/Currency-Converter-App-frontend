import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import './MainComponent.css';
import logoImage from '../../assets/file.png'
import { MoveRight } from 'lucide-react';

const MainComponent = () => {
    const [totalCurrencyNotes, setTotalCurrencyNotes] = useState('');
    const [fromSelected, setFromSelected] = useState(null);  
    const [toSelected, setToSelected] = useState(null);      
    const [convertedValue, setConvertedValue] = useState(0);
    const [listOfData, setListOfData] = useState([]);
    const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
    const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

    const fromDropdownRef = useRef(null);
    const toDropdownRef = useRef(null);

    const handleInput = (event) => {
        setTotalCurrencyNotes(event.target.value);
    };

    const fetchData = () => {
        if (fromSelected && toSelected) {
            axios.post(`https://currency-converter-app-backend-gilt.vercel.app/api/v1/currency/from/${fromSelected.countryCode}/to/${toSelected.countryCode}`, { NumberOfNotes: totalCurrencyNotes })
            .then((response) => {
                setConvertedValue(response.data);
            })
            .catch((error) => console.log(error));
        }
    };

    useEffect(() => {
        const getData = () => {
            axios.get('https://currency-converter-app-backend-gilt.vercel.app/api/v1/currency')
                .then((response) => {
                    setListOfData(response.data);
                })
                .catch((error) => console.log(error));
        };
        getData();

        const handleClickOutside = (event) => {
            if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target)) {
                setIsFromDropdownOpen(false);
            }
            if (toDropdownRef.current && !toDropdownRef.current.contains(event.target)) {
                setIsToDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFromSelection = (item) => {
        setFromSelected(item);  
        setIsFromDropdownOpen(false); 
    };

    const handleToSelection = (item) => {
        setToSelected(item);  
        setIsToDropdownOpen(false); 
    };

    return (
        <React.Fragment>
            <div className='main-container'>
                <div className='app-logo-name'>
                    <img src={logoImage} alt="" className='app-logo'/>
                    <p className="Header">Currency Converter</p>
                </div>
                <div className="currency-converter-container">
                    <div className="input-container">
                        <div className="dropdown" ref={fromDropdownRef}>
                            <div className="dropdown-header" onClick={() => setIsFromDropdownOpen((prev) => !prev)}>
                                {fromSelected ? (
                                    <div className="selected-item">
                                        <img
                                            src={`https://currency-converter-app-backend-gilt.vercel.app/${fromSelected.image}`}
                                            alt={fromSelected.countryCode}
                                            className="dropdown-item-image"
                                        />
                                        <span>{fromSelected.countryName} ({fromSelected.countryCode})</span>
                                    </div>
                                ) : 'Select From Currency'}
                            </div>
                            {isFromDropdownOpen && (
                                <ul className="dropdown-list">
                                    {listOfData && listOfData.map((iterator) => (
                                        <li
                                            key={iterator._id}
                                            className="dropdown-item"
                                            onClick={() => handleFromSelection(iterator)} 
                                        >
                                            <img
                                                src={`https://currency-converter-app-backend-gilt.vercel.app/${iterator.image}`}
                                                alt={iterator.countryCode}
                                                className="dropdown-item-image"
                                            />
                                            <span>
                                                {iterator.countryName} ({iterator.countryCode})
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            className="text-container"
                            type="text"
                            value={totalCurrencyNotes}
                            onChange={handleInput}
                            placeholder='Amount'
                        />
                    </div>
                    <MoveRight/>                            
                    <div className="input-container">
                        <div className="dropdown" ref={toDropdownRef}>
                            <div
                                className="dropdown-header"
                                onClick={() => setIsToDropdownOpen((prev) => !prev)}
                            >
                                {toSelected ? (
                                    <div className="selected-item">
                                        <img
                                            src={`https://currency-converter-app-backend-gilt.vercel.app/${toSelected.image}`}
                                            alt={toSelected.countryCode}
                                            className="dropdown-item-image"
                                        />
                                        <span>{toSelected.countryName} ({toSelected.countryCode})</span>
                                    </div>
                                ) : 'Select To Currency'}
                            </div>
                            {isToDropdownOpen && (
                                <ul className="dropdown-list">
                                    {listOfData && listOfData.map((iterator) => (
                                        <li
                                            key={iterator._id}
                                            className="dropdown-item"
                                            onClick={() => handleToSelection(iterator)}  
                                        >
                                            <img
                                                src={`https://currency-converter-app-backend-gilt.vercel.app/${iterator.image}`}
                                                alt={iterator.countryCode}
                                                className="dropdown-item-image"
                                            />
                                            <span>
                                                {iterator.countryName} ({iterator.countryCode})
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            className="text-container"
                            type="text"
                            value={convertedValue.expectedCurrencyValue || ''}
                            readOnly
                            placeholder='Amount'
                        />
                    </div>
                </div>
                <button onClick={fetchData} className="convert-button">Convert</button>
            </div>
        </React.Fragment>
    );
};

export default MainComponent;
