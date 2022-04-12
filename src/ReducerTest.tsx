import React, { useReducer, useCallback, useEffect, useState } from 'react';

interface CounterState {
    count: number
}

interface CounterAction {
    type: 'INCREASE' | 'DECREASE',
    value: number
}

function counterReducer(initialState: CounterState, action: CounterAction): CounterState {
    if(action.type === 'INCREASE') {
        return {
            ...initialState,
            count: initialState.count + action.value
        }
    } else if(action.type === 'DECREASE')  {
        return {
            ...initialState,
            count: initialState.count - action.value
        }
    }

    return initialState;
}

export default function ReducerTest() {
    const [state, dispatch] = useReducer(counterReducer, {
        count: 0
    })

    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        console.log('reducer 상태 변경')
    }, [state])

    return (
        <div>
            <button onClick={useCallback(() => {
                dispatch({
                    type: "INCREASE",
                    value: 5
                })
            }, [state])}>
                +
            </button>
            <button onClick={useCallback(() => {
                dispatch({
                    type: "DECREASE",
                    value: 5
                })
            }, [state])}>
                -
            </button>
            <button onClick={useCallback(() => {
                setToggle(!toggle);
            }, [toggle])}>
                toggle
            </button>            
            <div>
                {state.count}
            </div>
            <div>
                {toggle === true ? 'true' : 'false'}
            </div>
        </div>
    )
}
