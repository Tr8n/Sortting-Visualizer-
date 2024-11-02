import React, { useState, useEffect, useCallback } from 'react';
import './SortingVisualizer.css';

const InsertionSort = () => {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(50);
    const [isSorting, setIsSorting] = useState(false);

    // Function to generate a new array based on the current size
    const resetArray = useCallback(() => {
        if (isSorting) return;
        const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
        setArray(newArray);
    }, [arraySize, isSorting]);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

    // Insertion Sort with Animation
    const insertionSort = async () => {
        setIsSorting(true);
        const arr = [...array];

        for (let i = 1; i < arr.length; i++) {
            const key = arr[i];
            let j = i - 1;

            // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                setArray([...arr]); // Update array state
                await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
                j--;
            }
            arr[j + 1] = key;
        }

        setIsSorting(false);
    };

    // Fast Insertion Sort (instant sorting without animation)
    const fastInsertionSort = () => {
        const sortedArray = [...array];
        for (let i = 1; i < sortedArray.length; i++) {
            const key = sortedArray[i];
            let j = i - 1;

            while (j >= 0 && sortedArray[j] > key) {
                sortedArray[j + 1] = sortedArray[j];
                j--;
            }
            sortedArray[j + 1] = key;
        }
        setArray(sortedArray);
    };

    // Update array size based on scrollbar
    const handleArraySizeChange = (e) => {
        setArraySize(Number(e.target.value));
        resetArray();
    };

    return (
        <div>
            <h1>Insertion Sort Visualizer</h1>

            {/* Array size scrollbar */}
            <div className="array-size-control">
                <label>Array Size: {arraySize}</label>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={arraySize}
                    onChange={handleArraySizeChange}
                    disabled={isSorting}
                />
            </div>

            {/* Array display */}
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            height: `${value}px`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Control buttons */}
            <div className="controls">
                <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
                <button onClick={insertionSort} disabled={isSorting}>Start Sort</button>
                <button onClick={fastInsertionSort} disabled={isSorting}>Fast Sort</button>
            </div>

            {/* Documentation Table */}
            <h2>Notations Documentation</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Notation</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>n</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Number of elements in the array</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>i</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the outer loop</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>j</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the inner loop</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>key</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Element currently being compared for insertion</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>arr[]</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>The array being sorted</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InsertionSort;
