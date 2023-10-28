import React, { useState } from 'react';

function Search({ onOrderChange, onFilterChange }) {
    const [orderOption, setOrderOption] = useState('episode'); // Default order option
    const [filterText, setFilterText] = useState(''); // State for the text input

    // when pressing the dropdown this is triggered
    const handleOrderChange = (event) => {
        const newOrderOption = event.target.value;
        setOrderOption(newOrderOption);
        onOrderChange(newOrderOption);
    };

    //When typing this is triggered
    const handleFilterInputChange = (event) => {
        const newText = event.target.value;
        setFilterText(newText);
        onFilterChange(newText);
    };

    // Clear the text input when pressig the svg image button of reset
    const handleResetButton = () => {
        setFilterText(''); 
        onFilterChange('');
    };
      
    return (
        <>
        <h2>Star Wars Saga</h2>
            <div className='search-container'>
                <select onChange={handleOrderChange} value={orderOption}>
                    <option value="episode">Order by Episode</option>
                    <option value="release_date">Order by Year</option>
                </select>
                <form className="form">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                    <input className="input" placeholder="Type your text" required="" type="text" value={filterText} onChange={handleFilterInputChange}></input>
                    <button className="reset" type="reset" onClick={handleResetButton} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </>
    )
}
export default Search;