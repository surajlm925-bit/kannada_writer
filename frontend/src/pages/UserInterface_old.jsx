import React, { useState } from "react";
import axios from "axios";

// Inline styles for beautiful UI
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
    maxWidth: '4rem',
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
  textarea: {
    width: '100%',
    minHeight: '150px',
    padding: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontFamily: 'Noto Sans Kannada, sans-serif',
    resize: 'vertical',
    transition: 'border-color 0.2s ease'
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
  result: {
    backgroundColor: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginTop: '1.5rem',
    fontFamily: 'Noto Sans Kannada, sans-serif',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap'
  }
};
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Newspaper, FileText, Zap } from "lucide-react";
import {
  GeneratorForm,
  TopBandForm,
  PackageWriterForm,
  Speed50Form
} from "../components/generators/GeneratorForm";
import { ResultDisplay } from "../components/generators/ResultDisplay";

export default function UserInterface() {
  // Form state
  const [formState, setFormState] = useState({
    top_band: "",
    package_writer: "",
    speed_50: ""
  });

  // Results state
  const [results, setResults] = useState({
    top_band: "",
    package_writer: "",
    speed_50: ""
  });

  const [endpoint, setEndpoint] = useState("top_band");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    top_band: "",
    package_writer: "",
    speed_50: ""
  });

  const generatorTypes = [
    {
      id: "top_band",
      name: "Top Band",
      description: "Generate breaking news headlines",
      icon: <Newspaper className="h-4 w-4" />,
    },
    {
      id: "package_writer",
      name: "Package Writer",
      description: "Create detailed news articles",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "speed_50",
      name: "Speed 50",
      description: "Quick 50-word snippets",
      icon: <Zap className="h-4 w-4" />,
    }
  ];

  // Handle form input changes
  const handleInputChange = (value) => {
    setFormState({
      ...formState,
      [endpoint]: value
    });

    // Clear error when typing
    if (errors[endpoint]) {
      setErrors({
        ...errors,
        [endpoint]: ""
      });
    }
  };

  // Validate form input
  const validateForm = () => {
    const currentValue = formState[endpoint];

    if (!currentValue || !currentValue.trim()) {
      setErrors({
        ...errors,
        [endpoint]: "Please enter some text"
      });
      return false;
    }

    // Add specific validation for each generator type
    if (endpoint === "top_band" && currentValue.length < 10) {
      setErrors({
        ...errors,
        [endpoint]: "Input must be at least 10 characters"
      });
      return false;
    }

    if (endpoint === "package_writer" && currentValue.length < 20) {
      setErrors({
        ...errors,
        [endpoint]: "Package details should be at least 20 characters"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Convert endpoint to use underscores (backend uses underscores)
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      // Prepare request data based on endpoint
      let requestData;
      if (endpoint === 'speed_50') {
        // Speed 50 expects headlines array
        const lines = formState[endpoint].split('\n').filter(line => line.trim());
        requestData = { headlines: lines };
      } else {
        // Top Band and Package Writer expect text
        requestData = { text: formState[endpoint] };
      }
      
      const res = await axios.post(`${baseUrl}/${endpoint}`, requestData);

      // Format output based on endpoint
      let output;
      if (endpoint === 'speed_50' && res.data.results) {
        // Speed 50 returns array of results
        output = res.data.results.map((item, index) => 
          `${index + 1}. ${item.output || item.text || item}`
        ).join('\n\n');
      } else if (res.data.script || res.data.top_band) {
        // Top Band returns script and top_band
        output = `**Script:**\n${res.data.script || ''}\n\n**Top Band:**\n${res.data.top_band || ''}`;
      } else {
        // Default formatting
        output = res.data.output || res.data.content || JSON.stringify(res.data, null, 2);
      }

      // Update results for the current endpoint
      setResults({
        ...results,
        [endpoint]: output
      });
    } catch (err) {
      setErrors({
        ...errors,
        [endpoint]: "Error: " + err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value) => {
    setEndpoint(value);
    // We don't clear form state or results when switching tabs
    // This allows users to switch between tabs without losing their work
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          ಕನ್ನಡ AI Content Generator
        </h1>
        <p style={styles.subtitle}>
          Generate professional Kannada news content with AI-powered tools
        </p>
      </div>

        {/* Tabs Section */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="top_band" value={endpoint} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-2 shadow-lg">
          {generatorTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
              {type.icon}
              <span className="hidden sm:inline">{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

            <TabsContent value="top_band" className="space-y-6 mt-8">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                Top Band Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Generate 6-line Kannada news headline blocks</p>

              <TopBandForm
                value={formState.top_band}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={errors.top_band}
              />
            </CardContent>
          </Card>

          {results.top_band && (
            <ResultDisplay
              content={results.top_band}
              generatorType="top-band"
            />
          )}
        </TabsContent>

            <TabsContent value="package_writer" className="space-y-6 mt-8">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Package Writer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Create short Kannada AV packages</p>

              <PackageWriterForm
                value={formState.package_writer}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={errors.package_writer}
              />
            </CardContent>
          </Card>

          {results.package_writer && (
            <ResultDisplay
              content={results.package_writer}
              generatorType="package-writer"
            />
          )}
        </TabsContent>

            <TabsContent value="speed_50" className="space-y-6 mt-8">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Speed 50
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Generate up to 50 one-line news snippets</p>

              <Speed50Form
                value={formState.speed_50}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={errors.speed_50}
              />
            </CardContent>
          </Card>

          {results.speed_50 && (
            <ResultDisplay
              content={results.speed_50}
              generatorType="speed-50"
            />
          )}
        </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}