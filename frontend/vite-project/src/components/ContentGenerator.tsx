import React, { useState } from 'react';

const ContentGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/top_band`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      const combined = `Script:\n${data.script}\n\nTop Band:\n${data.top_band}`;
      setOutput(combined);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
    setLoading(false);
  };

  return (
    <div className="generator-container">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your prompt..."
        disabled={loading}
        className="generator-input"
      />
      <button onClick={onGenerate} disabled={loading || !inputText.trim()}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <div className="error">{error}</div>}
      <div className="output-container">
        {loading ? (
          <>
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
          </>
        ) : (
          output && <pre className="output">{output}</pre>
        )}
      </div>
    </div>
  );
};

export default ContentGenerator;
