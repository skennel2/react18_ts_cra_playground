import React, { useState, useEffect, useRef, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { flushSync } from 'react-dom';

function App() {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState<string[]>([]);

    // const [isPending, startTransition] = useTransition();

    const h1 = useRef<HTMLHeadingElement>(null);
        
    useEffect(() => {
        console.log('최초 마운팅');
        if(h1.current) {
            console.log(h1.current.getBoundingClientRect());
        }
    }, [])

    useEffect(() => {
        console.log('렌더링 발생');
    })

    useEffect(() => {
        console.log('count변경으로 인한 렌더링 발생');
    }, [count])

    useEffect(() => {
        console.log('flag변경으로 인한 렌더링 발생');
    }, [flag])

    const handleClick = useCallback(() => {
        flushSync(() => {
            setCount(count + 1);
        })
        flushSync(() => {
            setFlag(!flag);  
        })
    }, [count, flag])

    const handleClick2 = () => {
        setCount(count + 1);

        setFlag(!flag);  
    }

    const handleClick3 = () => {
        new Promise<void>((resolve) => {
            setCount(count + 1);
            setFlag(!flag);  
            resolve();
        })
    }

    const handleClick4 = () => {
        setTimeout(() => {
            setCount(count + 1);
            setFlag(!flag);  
        }, 0);
    }

    const updateSearchResult = (value: string) => {
        // startTran
    }

    return(
        <div>
            <div style={{
                padding: '20px',
            }}>
                <h1>
                    배치 업데이트
                </h1>

                <div>
                    <button onClick={handleClick}>
                        flushSync를 이용한 update
                    </button>
                    <button onClick={handleClick2}>
                        일반적인 업데이트
                    </button>
                    <button onClick={handleClick3}>
                        프라미스안의 업데이트
                    </button>    
                    <button onClick={handleClick4}>
                        setTimeout 0안의 업데이트
                    </button>                     
                </div>

                <h1 ref={h1} style={{ color: flag ? "blue" : "black" }}>{count}</h1>
            </div>

            <div style={{
                padding: '20px',
            }}>
                <h1>startTransaction</h1>
                <input value={inputValue} onChange={(e) => {
                    setInputValue(e.target.value);

                    updateSearchResult(e.target.value);
                }} />
                <div>
                    {
                        searchResult.map(item => {
                            return (<div>item</div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
}


export default App;
