import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Copy, Download, CheckCircle2, Share2, Printer, FileText } from 'lucide-react';

interface ResultDisplayProps {
    content: string;
    generatorType: string;
    timestamp?: string;
    title?: string;
}

export function ResultDisplay({ content, generatorType, timestamp, title }: ResultDisplayProps) {
    const [copied, setCopied] = useState(false);
    const [formattedContent, setFormattedContent] = useState(content);
    const [wordCount, setWordCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);

    // Format content and calculate metrics
    useEffect(() => {
        // Calculate metrics
        const words = content.trim().split(/\s+/).length;
        const lines = content.split('\n').filter(line => line.trim().length > 0).length;

        setWordCount(words);
        setLineCount(lines);

        // Format content based on generator type
        let formatted = content;

        // Apply specific formatting based on generator type
        if (generatorType === 'top-band') {
            // For top band, we might want to add line breaks or formatting
            formatted = formatTopBandContent(content);
        } else if (generatorType === 'package-writer') {
            // For package writer, we might want to format as paragraphs
            formatted = formatPackageContent(content);
        } else if (generatorType === 'speed-50') {
            // For speed 50, we might want to number the lines
            formatted = formatSpeed50Content(content);
        }

        setFormattedContent(formatted);
    }, [content, generatorType]);

    // Format functions for different generator types
    const formatTopBandContent = (text: string) => {
        // Add proper line breaks and formatting for top band content
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        return lines.join('\n\n');
    };

    const formatPackageContent = (text: string) => {
        // Format package content with proper paragraph breaks
        const paragraphs = text.split('\n\n').filter(para => para.trim().length > 0);
        return paragraphs.join('\n\n');
    };

    const formatSpeed50Content = (text: string) => {
        // Number each line for Speed 50 content
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        return lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(formattedContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([formattedContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `kannada-${generatorType}-${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>${title || 'Kannada Content'}</title>
            <style>
              @font-face {
                font-family: 'Noto Sans Kannada';
                src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&display=swap');
              }
              body {
                font-family: 'Noto Sans Kannada', sans-serif;
                padding: 20px;
                line-height: 1.6;
              }
              h1 {
                font-size: 18px;
                margin-bottom: 16px;
              }
              .content {
                white-space: pre-wrap;
                font-size: 14px;
              }
              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <h1>${title || 'Kannada Content Generator'}</h1>
            <div class="content">${formattedContent}</div>
            <div class="footer">Generated on ${timestamp || new Date().toLocaleString()}</div>
          </body>
        </html>
      `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-lg flex items-center justify-between">
                    <span>Generated Content</span>
                    <div className="text-sm font-normal text-gray-500 flex items-center gap-2">
                        <span>{wordCount} words</span>
                        <span>•</span>
                        <span>{lineCount} lines</span>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <div className="p-6 whitespace-pre-wrap font-kannada text-lg leading-relaxed">
                    {formattedContent}
                </div>
            </CardContent>

            <CardFooter className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    {timestamp || new Date().toLocaleString()}
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="flex items-center gap-1"
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                <span>Copy</span>
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="flex items-center gap-1"
                    >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrint}
                        className="flex items-center gap-1"
                    >
                        <Printer className="h-4 w-4" />
                        <span className="hidden sm:inline">Print</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}