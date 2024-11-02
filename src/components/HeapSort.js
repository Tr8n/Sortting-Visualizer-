import React, { useState, useEffect, useCallback } from 'react';

const HeapSort = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50); // Default array size
  const [isSorting, setIsSorting] = useState(false);

  // Function to generate a new array based on the current size
  const resetArray = useCallback(() => {
    if (isSorting) return; // Prevent reset while sorting
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
    setArray(newArray);
  }, [arraySize, isSorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  // Heap Sort with Animation
  const heapSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;

    // Heapify function
    const heapify = async (i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }

      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap elements
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
        await heapify(largest);
      }
    };

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap elements
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
      await heapify(0);
    }

    setIsSorting(false);
  };

  // Fast Sort (immediate sorting without animation)
  const fastSort = () => {
    const sortedArray = [...array].sort((a, b) => a - b); // Sorts in ascending order
    setArray(sortedArray);
  };

  // Update array size based on scrollbar
  const handleArraySizeChange = (e) => {
    setArraySize(e.target.value);
    resetArray(); // Regenerate array with the new size
  };

  return (
    <div>
      <h1>Sorting Visualizer <strong>Heap Sort</strong></h1>
      
      {/* Array size scrollbar */}
      <div className="array-size-control">
        <label>Array Size: {arraySize}</label>
        <input
          type="range"
          min="5"
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
        <button onClick={heapSort} disabled={isSorting}>Start Sort</button>
        <button onClick={fastSort} disabled={isSorting}>Fast Sort</button>
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
            <td style={{ border: '1px solid black', padding: '8px' }}>Current index</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>left</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Left child index</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>right</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Right child index</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>arr[]</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>The array being sorted</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>largest</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>Index of the largest element</td>
          </tr>
        </tbody>
      </table>

      {/* Algorithm Implementation in Java and Python */}
      <h2>Heap Sort Implementation</h2>
      <h3>Java</h3>
      <pre>
        {`public void heapSort(int[] arr) {
          int n = arr.length;

          // Build max heap
          for (int i = n / 2 - 1; i >= 0; i--) {
              heapify(arr, n, i);
          }

          // Extract elements from heap
          for (int i = n - 1; i > 0; i--) {
              // Move current root to end
              int temp = arr[0];
              arr[0] = arr[i];
              arr[i] = temp;

              // Call max heapify on the reduced heap
              heapify(arr, i, 0);
          }
      }

      private void heapify(int[] arr, int n, int i) {
          int largest = i;
          int left = 2 * i + 1;
          int right = 2 * i + 2;

          // If left child is larger than root
          if (left < n && arr[left] > arr[largest]) {
              largest = left;
          }

          // If right child is larger than largest so far
          if (right < n && arr[right] > arr[largest]) {
              largest = right;
          }

          // If largest is not root
          if (largest != i) {
              int swap = arr[i];
              arr[i] = arr[largest];
              arr[largest] = swap;

              // Recursively heapify the affected sub-tree
              heapify(arr, n, largest);
          }
      }`}
      </pre>

      <h3>Python</h3>
      <pre>
        {`def heap_sort(arr):
          n = len(arr)

          # Build max heap
          for i in range(n // 2 - 1, -1, -1):
              heapify(arr, n, i)

          # Extract elements from heap
          for i in range(n - 1, 0, -1):
              arr[0], arr[i] = arr[i], arr[0]  # Swap
              heapify(arr, i, 0)

      def heapify(arr, n, i):
          largest = i
          left = 2 * i + 1
          right = 2 * i + 2

          if left < n and arr[left] > arr[largest]:
              largest = left

          if right < n and arr[right] > arr[largest]:
              largest = right

          if largest != i:
              arr[i], arr[largest] = arr[largest], arr[i]  # Swap
              heapify(arr, n, largest)
      `}
      </pre>
    </div>
  );
};

export default HeapSort;
