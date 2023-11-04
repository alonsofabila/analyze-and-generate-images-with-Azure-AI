import React, { useState } from 'react';
import './stylesheets/App.css';
import { analyzeImage } from './azure-image-analysis';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAnalyzeClick = async () => {
    try {
      const analysis = await analyzeImage(inputValue);
      setAnalysis(analysis);
    } catch (error) {
      console.log(error);
    }
  }

  const displayAnalysis = () => {
    if (!analysis || !analysis.metadata || !analysis.metadata.imageType || !analysis.tags || !analysis.description) {
      return null; // Return null if any required property is missing
    } 
    return (
      <div>
        <h2>Analysis</h2>
        <p>URL: {analysis.URL}</p>
        <p>Image Type: {analysis.metadata.imageType.clipArtType}</p>
        <p>Image Format: {analysis.metadata.imageType.lineDrawingType}</p>
        <p>Tags: {analysis.tags.map(tag => tag.name).join(', ')}</p>
        <p>Caption: {analysis.description.captions[0].text}</p>
      </div>
    )
  }

  return (
    <div class="container">
      <h1>Computer Vision</h1>
      <label>
        <input type='text' placeholder='Enter URL to analyze or textual prompt to generate an image' value={inputValue}
          onChange={handleInputChange}></input>
      </label>
      <button onClick={handleAnalyzeClick}>Analyze</button>
      <button>Generate</button>
      {analysis && displayAnalysis()}
    </div>
  );
}

export default App;
