import React, { useState, useEffect, useCallback } from 'react';
import './SortingVisualizer.css';

const MergeSort = () => {
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

    // Merge Sort with Animation
    const mergeSort = async (arr) => {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = await mergeSort(arr.slice(0, mid));
        const right = await mergeSort(arr.slice(mid));

        return merge(left, right);
    };

    const merge = async (left, right) => {
        const result = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
            setArray((prevArray) => {
                const newArray = [...prevArray];
                newArray.splice(i + j, 1, result[result.length - 1]);
                return newArray;
            });
            await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
        }

        return [...result, ...left.slice(i), ...right.slice(j)];
    };

    // Start the sorting process
    const startMergeSort = async () => {
        setIsSorting(true);
        const sortedArray = await mergeSort(array);
        setArray(sortedArray);
        setIsSorting(false);
    };

    // Fast Merge Sort (instant sorting without animation)
    const fastMergeSort = () => {
        const sortedArray = mergeSortInstant(array);
        setArray(sortedArray);
    };

    const mergeSortInstant = (arr) => {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        return mergeInstant(mergeSortInstant(arr.slice(0, mid)), mergeSortInstant(arr.slice(mid)));
    };

    const mergeInstant = (left, right) => {
        const result = [];
        let i = 0;
        let j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
        return [...result, ...left.slice(i), ...right.slice(j)];
    };

    // Update array size based on scrollbar
    const handleArraySizeChange = (e) => {
        setArraySize(Number(e.target.value));
        resetArray();
    };

    return (
        <div>
            <h1>Merge Sort Visualizer</h1>

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
                <button onClick={startMergeSort} disabled={isSorting}>Start Sort</button>
                <button onClick={fastMergeSort} disabled={isSorting}>Fast Sort</button>
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
                        <td style={{ border: '1px solid black', padding: '8px' }}>mid</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Middle index for dividing the array</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>left</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Left half of the array being merged</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>right</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Right half of the array being merged</td>
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

export default MergeSort;
