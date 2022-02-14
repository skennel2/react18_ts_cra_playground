import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { flushSync } from 'react-dom';

function App() {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    const handleClick = () => {
        flushSync(() => {
            setCount(count + 1);
        })
        flushSync(() => {
            setFlag(!flag);  
        })
    }
    
    return(
        <div>
            <div>
                Test
            </div>
            <div onClick={handleClick}>
                {count}
            </div>

            <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
        </div>
    );
}


export default App;
