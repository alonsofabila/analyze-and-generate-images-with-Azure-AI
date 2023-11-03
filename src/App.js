import React, { useState } from 'react';
import './stylesheets/App.css';
import analyzeImage from './azure-image-analysis';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAnalyzeClick = async () => {
    try{
      const analysis = await analyzeImage(inputValue);
      console.log(analysis);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container">
      <h1>Computer Vision</h1>
      <label>
        <input type='text' placeholder='Enter URL to analyze or textual prompt to generate an image' value={inputValue}
          onChange={handleInputChange}></input>
      </label>
      <button onClick={handleAnalyzeClick}>Analyze</button>
      <button>Generate</button>
    </div>
  );
}

export default App;
