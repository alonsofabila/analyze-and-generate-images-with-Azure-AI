import React from 'react';

function App() {
  return (
    <div class="container">
      <h1>Computer Vision</h1>
      <label>
        <input type='text' placeholder='Enter URL to analyze or textual prompt to generate an image'></input>
      </label>
      <button>Analyze</button>
      <button>Generate</button>
    </div>
  );
}

export default App;
