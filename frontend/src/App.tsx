import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Download, Copy, Loader2, AlertCircle } from 'lucide-react'

interface GeneratedContent {
  title: string
  content: string
  module: string
}

function App() {
  const [selectedModule, setSelectedModule] = useState<string>('top_band')
  const [prompt, setPrompt] = useState<string>('')
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const modules = [
    { id: 'top_band', name: 'Top Band', description: 'Generate breaking news headlines' },
    { id: 'package_writer', name: 'Package Writer', description: 'Create detailed news articles' },
    { id: 'speed_50', name: 'Speed 50', description: 'Quick 50-word snippets' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedContent(null)

    try {
      const response = await fetch(`http://localhost:8000/${selectedModule}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Something went wrong');
      }

      const data = await response.json();
      const content = data.output || data.text || JSON.stringify(data, null, 2);
      
      setGeneratedContent({
        title: `${modules.find(m => m.id === selectedModule)?.name} - ${prompt.substring(0, 50)}...`,
        content: content,
        module: modules.find(m => m.id === selectedModule)?.name || ''
      });
      
    } catch (error: any) {
      console.error(error);
      setError("Error: " + error.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyContent = async () => {
    if (generatedContent) {
      await navigator.clipboard.writeText(
        `${generatedContent.title}\n\n${generatedContent.content}`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadContent = () => {
    if (generatedContent) {
      const content = `${generatedContent.title}\n\n${generatedContent.content}`
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `kannada-content-${selectedModule}-${Date.now()}.txt`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Kannada AI Content Generator</h1>
          <p className="text-lg text-gray-600">Generate Kannada news content with AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation</CardTitle>
              <CardDescription>Fill in the details to generate your news content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="module">Select Module</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.name} - {module.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Enter your prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Example: Heavy rain in Bangalore today..."
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value)
                    setError('')
                  }}
                  className="min-h-[120px]"
                />
                {error && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                  </p>
                )}
              </div>

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

          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>Your generated content will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">{generatedContent.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{generatedContent.content}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCopyContent}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      {copied ? 'Copied!' : 'Copy'}
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
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>{isLoading ? 'Generating...' : 'Use the form to generate content'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App