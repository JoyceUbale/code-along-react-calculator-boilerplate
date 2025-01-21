import React,{useReducer} from 'react';
import './Calculator.css';

const initState ={
    inputs:"",
    res:""
}
let operators =["+","-","*","/"]
function reducer(state = initState,{type,payload}){
    switch(type){
        case "ADDINP":{
            console.log(type,payload)
            let addOps = true;
            // if my last and first el is an operator
            if(operators.includes(payload)&& operators.includes(state.inputs.slice(state.inputs.length-1,state.inputs.length))){
                addOps = false;
            }
            else{
                addOps = true;
            }

            if(addOps){
                console.log({...state,inputs:state.inputs + payload})
                return{...state, inputs: state.inputs + payload}
            }
            return{...state}
        }
        case "CALCULATE": {
            try {
                const inplen = state.inputs.length;
                if (operators.includes(state.inputs.slice(inplen - 1, inplen))) {
                    return { ...state, res: "Invalid Expression" };
                }
        
                const result = eval(state.inputs);
                if (!isFinite(result)) {
                    throw new Error("Cannot divide by zero");
                }
        
                return {
                    ...state,
                    inputs: result.toString(),
                    res: "",
                };
            } catch (error) {
                console.error(error.message);
                return {
                    ...state,
                    res: "Error",
                };
            }
        }
        
        case "DELETE":{
            return{
                ...state,inputs:state.inputs.slice(0,state.inputs.length-1)
            }
        }
        case "CLEAR":{
            return{...state,inputs:"",res:""}
        }
        default:{
            return state;
        }
    }
}
const Calculator = () => {
    
    // 1. write the useReducer-----keeping our logic and display seperates - always keep reducer outside of the comp also the initstate
    const [state,dispatch]=useReducer(reducer,initState)

    let handleClick = (val)=>{
        dispatch({type:"ADDINP",payload:val})
    }

    let handleClear = ()=>{
        dispatch({type:"CLEAR"})
    }
    let handleCal = ()=>{
        dispatch({type:"CALCULATE"})
    }
    let handleDel = ()=>{
        dispatch({type:"DELETE"})
        
    }

  return (
    <div className="calculator">
      <div className="calculator-screen">
        <div>{state.inputs}</div>
      </div>
      <div className="calculator-keys">
        <button className="key key-clear" onClick={handleClear}>AC</button>
        <button className="key key-delete" onClick={handleDel}>DEL</button>
        <button className="key" onClick={()=>handleClick("1")}>1</button>
        <button className="key" onClick={()=>handleClick("*")}>*</button>
        <button className="key" onClick={()=>handleClick("2")}>2</button>
        <button className="key" onClick={()=>handleClick("3")}>3</button>
        <button className="key" onClick={()=>handleClick("4")}>4</button>
        <button className="key" onClick={()=>handleClick("-")}>-</button>
        <button className="key" onClick={()=>handleClick("5")}>5</button>
        <button className="key" onClick={()=>handleClick("6")}>6</button>
        <button className="key" onClick={()=>handleClick("7")}>7</button>
        <button className="key" onClick={()=>handleClick("+")}>+</button>
        <button className="key" onClick={()=>handleClick("8")}>8</button>
        <button className="key" onClick={()=>handleClick("9")}>9</button>
        <button className="key" onClick={()=>handleClick("/")}>/</button>
        <button className="key" onClick={()=>handleClick(".")}>.</button>
        <button className="key" onClick={()=>handleClick("0")}>0</button>
        <button className="key" onClick={handleCal}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
