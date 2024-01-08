import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(0);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);
  function generatePassword() {
    const allowedChars = [];
    allowedChars.push(...'abcdefghijklmnopqrstuvwxyz');
    if (numAllowed) {
      allowedChars.push(...'0123456789');
    }
    if (charAllowed) {
      allowedChars.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if (allowedChars.length === 0) {
      throw new Error('At least one of isNumAllowed or isCharAllowed must be true.');
    }

    let password = '';
    while (password.length < length) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }

    return password;
  }

  useEffect(() => {
    setPassword(generatePassword);
  }, [length, numAllowed, charAllowed])

  return (
    <>
      <div className="flex flex-col items-center justify-between h-12 bg-gray-50 rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between w-full">
          <input
            type="text"
            value={password}
            ref={passwordInputRef}
            readOnly
            className="w-full bg-gray-200 text-center text-lg font-semibold text-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-800"
          />

          <button
            onClick={() => {
              navigator.clipboard.writeText(password)
              passwordInputRef.current.select();}}
            
            className="w-20 h-10 bg-blue-500 text-white rounded-md text-center font-semibold flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800"
          >Copy
          </button>
        </div>
        <div className="flex items-center space-x-4 mt-5">

          <div className='flex flex-col'>
            <input
              type="range"
              id="min-and-max-range-slider-usage"
              value={length}
              min="0"
              max="16"
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-gray-300 rounded-md cursor-pointer"
            />

            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-5">
              Length: {length} </label>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={numAllowed}
              onChange={() => setNumAllowed(!numAllowed)}
              className="sr-only peer"
            />
            <div
              className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"
            />
            <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">Numbers</span>
          </label>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="sr-only peer"
            />
            <div
              className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"
            />
            <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300">Uppercase</span>
          </label>
        </div>
      </div>
    </>
  )
}

export default App
