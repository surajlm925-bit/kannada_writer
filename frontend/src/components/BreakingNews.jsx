import React, { useState } from 'react';

const BreakingNews = () => {
  const [inputText, setInputText] = useState('');
  const [maxLines, setMaxLines] = useState(4);
  const [generatedNews, setGeneratedNews] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/breaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kannada_input: inputText, max_lines: maxLines })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setGeneratedNews(data.breaking_news);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedNews('Failed to generate breaking news.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="breaking-news">
      <h2>Breaking News Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="kannadaInput">Kannada Input:</label>
          <textarea
            id="kannadaInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>
        <div>
          <label htmlFor="maxLines">Max Lines:</label>
          <input
            type="number"
            id="maxLines"
            value={maxLines}
            onChange={(e) => setMaxLines(parseInt(e.target.value))}
            min="1"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Breaking News'}
        </button>
      </form>
      
      {generatedNews && (
        <div className="result">
          <h3>Generated Breaking News:</h3>
          <p>{generatedNews}</p>
        </div>
      )}
    </div>
  );
};

export default BreakingNews;
