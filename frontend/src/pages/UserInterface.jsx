import React, { useState } from "react";
import axios from "axios";

// Beautiful inline styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
    padding: '2rem',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#6b7280',
    maxWidth: '32rem',
    margin: '0 auto'
  },
  tabsContainer: {
    maxWidth: '64rem',
    margin: '0 auto'
  },
  tabs: {
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '0.75rem',
    padding: '0.5rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  tab: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '1rem',
    fontWeight: '500'
  },
  activeTab: {
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    marginBottom: '2rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1f2937'
  },
  cardDescription: {
    color: '#6b7280',
    marginBottom: '1.5rem'
  },
  textarea: {
    width: '100%',
    minHeight: '150px',
    padding: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontFamily: 'Noto Sans Kannada, sans-serif',
    resize: 'vertical',
    transition: 'border-color 0.2s ease',
    marginBottom: '1rem'
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
  },
  buttonHover: {
    backgroundColor: '#2563eb',
    transform: 'translateY(-1px)'
  },
  result: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '2rem',
    marginTop: '1.5rem',
    fontFamily: 'Noto Sans Kannada, sans-serif',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6b7280'
  },
  error: {
    backgroundColor: '#fef2f2',
    border: '2px solid #fecaca',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginTop: '1rem',
    color: '#dc2626'
  }
};

const generatorTypes = [
  {
    id: 'top_band',
    name: 'Top Band',
    icon: '📰',
    description: 'Generate script and Top Band content'
  },
  {
    id: 'package_writer',
    name: 'Package Writer',
    icon: '📝',
    description: 'Generate detailed news packages'
  },
  {
    id: 'speed_50',
    name: 'Speed 50',
    icon: '⚡',
    description: 'Generate up to 50 one-line news snippets'
  }
];

export default function UserInterface() {
  const [activeTab, setActiveTab] = useState('top_band');
  const [formState, setFormState] = useState({
    top_band: '',
    package_writer: '',
    speed_50: ''
  });
  const [results, setResults] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (value) => {
    setFormState({
      ...formState,
      [activeTab]: value
    });
  };

  const handleSubmit = async () => {
    if (!formState[activeTab].trim()) {
      setErrors({
        ...errors,
        [activeTab]: 'Please enter some content'
      });
      return;
    }

    setIsLoading(true);
    setErrors({ ...errors, [activeTab]: '' });

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      // Prepare request data based on endpoint
      let requestData;
      if (activeTab === 'speed_50') {
        const lines = formState[activeTab].split('\n').filter(line => line.trim());
        requestData = { headlines: lines };
      } else {
        requestData = { text: formState[activeTab] };
      }
      
      const res = await axios.post(`${baseUrl}/${activeTab}`, requestData);

      // Format the response for display
      let output;
      if (Array.isArray(res.data)) {
        output = res.data.map((item, index) => 
          `${index + 1}. ${item.output || item.text || item}`
        ).join('\n\n');
      } else if (res.data.script || res.data.top_band) {
        // Format Top Band response with proper sections
        let formattedOutput = '';
        
        if (res.data.script) {
          formattedOutput += `📝 ಸ್ಕ್ರಿಪ್ಟ್:\n${res.data.script.replace(/\\n/g, '\n').trim()}\n\n`;
        }
        
        if (res.data.top_band) {
          formattedOutput += `📰 ಟಾಪ್ ಬ್ಯಾಂಡ್:\n${res.data.top_band.replace(/\\n/g, '\n').trim()}\n\n`;
        }
        
        if (res.data.location) {
          formattedOutput += `📍 ಸ್ಥಳ: ${res.data.location}\n\n`;
        }
        
        if (res.data.category) {
          formattedOutput += `🏷️ ವರ್ಗ: ${res.data.category}`;
        }
        
        output = formattedOutput.trim();
      } else {
        // Handle other response types and clean up \n characters
        let rawOutput = res.data.output || res.data.content || JSON.stringify(res.data, null, 2);
        output = rawOutput.replace(/\\n/g, '\n').trim();
      }

      setResults({
        ...results,
        [activeTab]: output
      });
    } catch (err) {
      setErrors({
        ...errors,
        [activeTab]: `Error: ${err.response?.data?.detail || err.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          ಸುದ್ದಿ ಸಂಗಾತಿ
        </h1>
        <p style={styles.subtitle}>
          Generate professional Kannada news content with AI-powered tools
        </p>
      </div>

      <div style={styles.tabsContainer}>
        {/* Tabs */}
        <div style={styles.tabs}>
          {generatorTypes.map((type) => (
            <button
              key={type.id}
              style={{
                ...styles.tab,
                ...(activeTab === type.id ? styles.activeTab : {})
              }}
              onClick={() => handleTabChange(type.id)}
            >
              {type.icon} {type.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            {generatorTypes.find(t => t.id === activeTab)?.icon} {generatorTypes.find(t => t.id === activeTab)?.name}
          </div>
          <div style={styles.cardDescription}>
            {generatorTypes.find(t => t.id === activeTab)?.description}
          </div>

          <textarea
            style={styles.textarea}
            value={formState[activeTab]}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Enter ${activeTab === 'speed_50' ? 'topics (one per line)' : 'content'} in Kannada...`}
          />

          <button
            style={styles.button}
            onClick={handleSubmit}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                Object.assign(e.target.style, styles.buttonHover);
              }
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, styles.button);
            }}
          >
            {isLoading ? 'Generating...' : `Generate ${generatorTypes.find(t => t.id === activeTab)?.name}`}
          </button>

          {errors[activeTab] && (
            <div style={styles.error}>
              {errors[activeTab]}
            </div>
          )}

          {results[activeTab] && (
            <div style={styles.result}>
              {results[activeTab]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
