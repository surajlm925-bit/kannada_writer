import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  Download, 
  Copy, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Zap,
  Newspaper,
  RefreshCw,
  Settings,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react'

interface GeneratedContent {
  title: string
  content: string
  module: string
  timestamp: string
  wordCount: number
}

interface ApiResponse {
  output?: string
  text?: string
  content?: string
  result?: string
  [key: string]: any
}

function ContentGenerator() {
  const [selectedModule, setSelectedModule] = useState<string>('top_band')
  const [prompt, setPrompt] = useState<string>('')
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [history, setHistory] = useState<GeneratedContent[]>([])
  const [currentTab, setCurrentTab] = useState<string>('generator')

  const modules = [
    { 
      id: 'top_band', 
      name: 'Top Band', 
      description: 'Generate breaking news headlines',
      icon: <Newspaper className="h-4 w-4" />,
      color: 'bg-red-500'
    },
    { 
      id: 'package_writer', 
      name: 'Package Writer', 
      description: 'Create detailed news articles',
      icon: <FileText className="h-4 w-4" />,
      color: 'bg-blue-500'
    },
    { 
      id: 'speed_50', 
      name: 'Speed 50', 
      description: 'Quick 50-word snippets',
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-green-500'
    }
  ]

  // Auto-save to localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('kannada-content-history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kannada-content-history', JSON.stringify(history))
  }, [history])

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedContent(null)

    try {
      // Fixed API endpoint - ensure it matches your backend
      const response = await fetch(`http://localhost:8000/api/${selectedModule}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          prompt: prompt,
          text: prompt, // Some endpoints might expect 'text'
          input: prompt // Some endpoints might expect 'input'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      
      // Handle different response formats
      const content = data.output || data.text || data.content || data.result || JSON.stringify(data, null, 2);
      
      const newContent: GeneratedContent = {
        title: `${modules.find(m => m.id === selectedModule)?.name} - ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}`,
        content: content,
        module: modules.find(m => m.id === selectedModule)?.name || '',
        timestamp: new Date().toLocaleString(),
        wordCount: content.split(/\s+/).length
      };

      setGeneratedContent(newContent);
      
      // Add to history
      setHistory(prev => [newContent, ...prev.slice(0, 9)]); // Keep last 10 items
      
    } catch (error: any) {
      console.error('Generation error:', error);
      setError(`Failed to generate content: ${error.message}`);
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyContent = async () => {
    if (generatedContent) {
      try {
        await navigator.clipboard.writeText(
          `${generatedContent.title}\n\n${generatedContent.content}`
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        setError('Failed to copy content')
      }
    }
  }

  const handleDownloadContent = () => {
    if (generatedContent) {
      const content = `${generatedContent.title}\n\n${generatedContent.content}\n\nGenerated on: ${generatedContent.timestamp}`
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `kannada-content-${selectedModule}-${Date.now()}.txt`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('kannada-content-history')
  }

  const selectedModuleData = modules.find(m => m.id === selectedModule)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Content Generator
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Generate Kannada news content with AI
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="history">History ({history.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Settings className="h-5 w-5" />
                  Content Generation
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Configure your content generation settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="module" className="dark:text-white">Select Module</Label>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          <div className="flex items-center gap-2">
                            {module.icon}
                            <span>{module.name}</span>
                            <Badge variant="secondary" className="ml-auto">
                              {module.description}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedModuleData && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-2 h-2 rounded-full ${selectedModuleData.color}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {selectedModuleData.description}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt" className="dark:text-white">Enter your prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Example: Heavy rain in Bangalore today causes traffic jams..."
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value)
                      setError('')
                    }}
                    className="min-h-[120px] dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {prompt.length}/1000 characters
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading || !prompt.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Generated Content</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Your AI-generated content will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="dark:text-white">
                        {generatedContent.module}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {generatedContent.wordCount} words
                      </span>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg max-h-96 overflow-y-auto">
                      <h3 className="font-semibold text-lg mb-3 dark:text-white">
                        {generatedContent.title}
                      </h3>
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {generatedContent.content}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleCopyContent}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button 
                        onClick={handleDownloadContent}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Generated on {generatedContent.timestamp}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No content generated yet</p>
                    <p className="text-sm">
                      {isLoading ? 'AI is working on your request...' : 'Use the form to generate content'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">Generation History</h3>
            {history.length > 0 && (
              <Button onClick={clearHistory} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
          
          {history.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No generation history yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {history.map((item, index) => (
                <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{item.module}</Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.timestamp}
                      </span>
                    </div>
                    <h4 className="font-medium mb-2 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {item.content}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.wordCount} words
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => navigator.clipboard.writeText(item.content)}
                          variant="ghost" 
                          size="sm"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          onClick={() => setGeneratedContent(item)}
                          variant="ghost" 
                          size="sm"
                        >
                          <FileText className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ContentGenerator