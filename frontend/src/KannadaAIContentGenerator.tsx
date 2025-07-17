import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Download, Copy, Loader2, AlertCircle } from 'lucide-react'

interface GeneratedContent {
  title: string
  content: string
  module: string
}

export default function KannadaAIContentGenerator() {
  const [selectedModule, setSelectedModule] = useState<string>('top-band')
  const [prompt, setPrompt] = useState<string>('')
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const modules = [
    { id: 'top-band', name: 'Top Band', description: 'Generate breaking news headlines and short updates' },
    { id: 'package-writer', name: 'Package Writer', description: 'Create detailed news articles and stories' },
    { id: 'speed-50', name: 'Speed 50', description: 'Quick 50-word news snippets' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('ದಯವಿಟ್ಟು ಪ್ರಾಂಪ್ಟ್ ನಮೂದಿಸಿ')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedContent(null)

    try {
      const response = await fetch('http://localhost:8000/' + selectedModule, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'ಏನೋ ತಪ್ಪಾಗಿದೆ');
      }

      const data = await response.json();
      
      // Handle the response based on your API structure
      const content = data.output || data.text || JSON.stringify(data, null, 2);
      
      setGeneratedContent({
        title: `${modules.find(m => m.id === selectedModule)?.name} - ${prompt.substring(0, 50)}...`,
        content: content,
        module: modules.find(m => m.id === selectedModule)?.name || ''
      });
      
    } catch (error: any) {
      console.error(error);
      setError("⚠️ ದೋಷ: " + error.message);
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ಕನ್ನಡ AI ಕಂಟೆಂಟ್ ಜನರೇಟರ್</h1>
          <p className="text-lg text-gray-600">ಅತ್ಯಾಧುನಿಕ AI ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಕನ್ನಡ ಸುದ್ದಿ ವಿಷಯಗಳನ್ನು ರಚಿಸಿ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>ವಿಷಯ ರಚನೆ</CardTitle>
              <CardDescription>ನಿಮ್ಮ ಸುದ್ದಿ ವಿಷಯವನ್ನು ರಚಿಸಲು ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Module Selection */}
              <div className="space-y-2">
                <Label htmlFor="module">ಮಾಡ್ಯೂಲ್ ಆಯ್ಕೆಮಾಡಿ</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger>
                    <SelectValue placeholder="ಮಾಡ್ಯೂಲ್ ಆಯ್ಕೆಮಾಡಿ" />
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

              {/* Prompt Input */}
              <div className="space-y-2">
                <Label htmlFor="prompt">ನಿಮ್ಮ ಸುದ್ದಿ ವಿಷಯಕ್ಕಾಗಿ ಪ್ರಾಂಪ್ಟ್ ನಮೂದಿಸಿ</Label>
                <Textarea
                  id="prompt"
                  placeholder="ಉದಾಹರಣೆ: ಬೆಂಗಳೂರಿನಲ್ಲಿ ಇಂದು ಭಾರೀ ಮಳೆ, ಜನಜೀವನ ಅಸ್ತವ್ಯಸ್ತ..."
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

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !prompt.trim()}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ವಿಷಯ ರಚಿಸಲಾಗುತ್ತಿದೆ...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    ವಿಷಯ ರಚಿಸಿ
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>ರಚಿತ ವಿಷಯ</CardTitle>
              <CardDescription>ಇಲ್ಲಿ ನಿಮ್ಮ ರಚಿತ ಕನ್ನಡ ಸುದ್ದಿ ವಿಷಯ ಕಾಣಿಸುತ್ತದೆ</CardDescription>
            </CardHeader>
            <CardContent>
              {error && !isLoading && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
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
                      {copied ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'ನಕಲಿಸಿ'}
                    </Button>
                    <Button 
                      onClick={handleDownloadContent}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      ಡೌನ್ಲೋಡ್
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>{isLoading ? 'ವಿಷಯ ರಚಿಸಲಾಗುತ್ತಿದೆ...' : 'ವಿಷಯ ರಚಿಸಲು ಮೇಲಿನ ಫಾರ್ಮ್ ಬಳಸಿ'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶನ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Top Band</h4>
                <p className="text-gray-600">ಬ್ರೇಕಿಂಗ್ ನ್ಯೂಸ್ ಹೆಡ್ಲೈನ್‌ಗಳು ಮತ್ತು ಚಿಕ್ಕ ನವೀಕರಣಗಳಿಗಾಗಿ</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Package Writer</h4>
                <p className="text-gray-600">ವಿವರವಾದ ಸುದ್ದಿ ಲೇಖನಗಳು ಮತ್ತು ಕಥೆಗಳಿಗಾಗಿ</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Speed 50</h4>
                <p className="text-gray-600">ತ್ವರಿತ 50 ಪದಗಳ ಸುದ್ದಿ ಸಂಕ್ಷಿಪ್ತಗಳಿಗಾಗಿ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}