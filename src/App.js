import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const response = await fetch('http://localhost:5000/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ markdown }),
        });
        const data = await response.json();
        setHtml(data.html);
      } catch (error) {
        console.error('Error converting markdown:', error);
      }
    };
    convertMarkdown();
  }, [markdown]);

  return (
    <div className="App">
      <div className="editor">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type your markdown here..."
        />
      </div>
      <div className="preview">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export default App;
