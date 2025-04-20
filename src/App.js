/* eslint-disable no-eval */
import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

const Calculator = () => {
  // State management
  const [displayValue, setDisplayValue] = useState('');
  const [memory, setMemory] = useState(0);

  // Event handlers
  const handleNumber = (value) => setDisplayValue(prev => prev + value);
  const handleOperator = (operator) => setDisplayValue(prev => prev + operator);
  
  const handleEqual = () => {
    try {
      const result = evaluate(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const handleClear = () => setDisplayValue('');
  const handleDelete = () => setDisplayValue(prev => prev.slice(0, -1));

  const handleScientific = (type) => {
    try {
      const value = parseFloat(displayValue);
      const operations = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        log: Math.log10,
        ln: Math.log,
        '√': Math.sqrt,
        '^2': (x) => Math.pow(x, 2)
      };
      const result = operations[type]?.(value) ?? value;
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const handleMemory = (action) => {
    const current = parseFloat(displayValue) || 0;
    const memoryOperations = {
      'M+': (prev) => prev + current,
      'M-': (prev) => prev - current,
      'MR': () => memory,
      'MC': () => 0
    };
    
    if (action === 'MR') {
      setDisplayValue(memoryOperations[action]().toString());
    } else if (memoryOperations[action]) {
      setMemory(memoryOperations[action]);
    }
  };

  // Button component
  const CalcButton = ({ value, onClick, className }) => (
    <button className={className} onClick={() => onClick(value)}>
      {value}
    </button>
  );

  // Button configuration
  const buttonConfig = [
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '/', type: 'operator' },
    { value: 'sin', type: 'scientific' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '*', type: 'operator' },
    { value: 'cos', type: 'scientific' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '-', type: 'operator' },
    { value: 'tan', type: 'scientific' },
    { value: '0', type: 'number' },
    { value: '.', type: 'number' },
    { value: '=', type: 'equal' },
    { value: '+', type: 'operator' },
    { value: '√', type: 'scientific' }
  ];

  const getHandler = (type) => {
    switch (type) {
      case 'number': return handleNumber;
      case 'operator': return handleOperator;
      case 'scientific': return handleScientific;
      case 'equal': return handleEqual;
      default: return () => {};
    }
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue || '0'}</div>
      <div className="button-grid">
        {buttonConfig.map(({ value, type }) => (
          <CalcButton
            key={value}
            value={value}
            className={type === 'number' ? '' : type}
            onClick={getHandler(type)}
          />
        ))}
        <CalcButton value="C" onClick={handleClear} className="action" />
        <CalcButton value="←" onClick={handleDelete} className="action" />
        <CalcButton value="M+" onClick={handleMemory} className="memory" />
        <CalcButton value="M-" onClick={handleMemory} className="memory" />
        <CalcButton value="MR" onClick={handleMemory} className="memory" />
        <CalcButton value="MC" onClick={handleMemory} className="memory" />
      </div>
    </div>
  );
};

export default Calculator;
