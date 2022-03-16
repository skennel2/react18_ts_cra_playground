import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';

function BasicTest() {
    // useState(디폴트 값) return [state 변수, state변경 함수]
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState<string[]>([]);

    // const [isPending, startTransition] = useTransition();

    const h1Ref = useRef<HTMLHeadingElement>(null);
        
    // useEffect의 첫번째 인자로 빈배열을 넘길경우 최초 마운팅에 의한 렌더링에서만 호출된다.
    useEffect(() => {
        console.log('최초 마운팅');
        if(h1Ref.current) {
            console.log(h1Ref.current.getBoundingClientRect());
        }
    }, [])

    // useEffect의 두번째 인자를 주지 않은 경우 모든 렌더링마다 호출된다.
    useEffect(() => {
        console.log('렌더링 발생');
    })

    // useEffect의 두번째 인자로 state변수를 넘길 경우 해당 state의 변경에 의한 렌더링에만 호출된다.
    useEffect(() => {
        console.log('count변경으로 인한 렌더링 발생');
    }, [count])

    useEffect(() => {
        console.log('flag변경으로 인한 렌더링 발생');
    }, [flag])

    // useCallback은 특정 함수를 새로 만들지 않고 재사용하고싶을떄 사용한다.
    // 함수를 재사용하지 않을 경우 props가 변경되지 않았을때 발생하는 렌더링을 막는 최적화를 진행하는것이 불가능할수도 있다.
    // useCallback의 첫번째 인자는 재사용할 콜백, 두번째 인자로는 콜백내에서 사용하는 state나 props를 배열로 전달해주어야한다.

    // flushSync를 이용한 update
    const handleClick = useCallback(() => {
        flushSync(() => {
            setCount(count + 1);
        })
        flushSync(() => {
            setFlag(!flag);  
        })
    }, [count, flag])

    // 일반적인 업데이트
    // 배치 업데이트가 일어난다.
    const handleClick2 = () => {
        setCount(count + 1);

        setFlag(!flag);  
    }

    // 프라미스안의 업데이트
    // 배치 렌더링이 일어난다.
    const handleClick3 = () => {
        new Promise<void>((resolve) => {
            setCount(count + 1);
            setFlag(!flag);  
            resolve();
        })
    }

    // setTimeout 0안의 업데이트
    // 각각 렌더링이 일어난다.
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

                <h1 ref={h1Ref} style={{ color: flag ? "blue" : "black" }}>{count}</h1>
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

export default BasicTest;
