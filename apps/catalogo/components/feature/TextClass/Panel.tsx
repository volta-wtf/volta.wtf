import { useState, useEffect, type CSSProperties } from 'react';
import { motion } from '@/lib/motion';
import { Badge } from '@/components/ui/badge';
import { Copy, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import type { TextClass } from '@/types';

interface TextClassPanelProps {
  textClass: TextClass;
  onClose: () => void;
}

// Background options for the selector
const backgroundOptions = [
  { id: 'preview', name: 'Default', class: 'bg-preview-default' },
  { id: 'background', name: 'Background', class: 'bg-preview-background' },
  { id: 'muted', name: 'Muted', class: 'bg-preview-muted' },
  { id: 'subtle', name: 'Subtle', class: 'bg-preview-subtle' },
  { id: 'color-1', name: 'Color 1', class: 'bg-preview-color-1' },
  { id: 'color-2', name: 'Color 2', class: 'bg-preview-color-2' },
  { id: 'color-3', name: 'Color 3', class: 'bg-preview-color-3' },
  { id: 'gradient', name: 'Gradient', class: 'bg-preview-gradient' },
  { id: 'image', name: 'Image', class: 'bg-preview-image' }
];

export function TextClassPanel({ textClass, onClose }: TextClassPanelProps) {
  const [selectedBackground, setSelectedBackground] = useState('preview');
  const [cssContent, setCssContent] = useState<string>('');
  const [isLoadingCSS, setIsLoadingCSS] = useState<boolean>(true);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const generateCSSClass = () => {
    return `.text-${textClass.id}`;
  };

  const generateUsageHTML = () => {
    const dataAttr = textClass.usesData ? ` data-text="${textClass.previewText}"` : '';
    return `<span class="text-${textClass.id}"${dataAttr}>${textClass.previewText}</span>`;
  };

      // Function to clean CSS comments and unnecessary whitespace
  const cleanCSS = (css: string): string => {
    let cleaned = css
      // Remove /* */ comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove // comments (though rare in CSS)
      .replace(/\/\/.*$/gm, '')
      // Remove empty lines
      .replace(/^\s*[\r\n]/gm, '')
      .trim();

    // Split into lines and process each line
    const lines = cleaned.split('\n');
    const result: string[] = [];
    let indentLevel = 0;

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      // Decrease indent for closing braces
      if (line.includes('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Add line with proper indentation
      const indent = '    '.repeat(indentLevel);
      result.push(indent + line);

      // Increase indent for opening braces
      if (line.includes('{')) {
        indentLevel++;
      }
    }

    return result.join('\n');
  };

  // Function to read and process CSS file
  const readCSSFile = async (filename: string): Promise<string> => {
    try {
      const response = await fetch(`/styles/text/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }
      const cssContent = await response.text();
      return cleanCSS(cssContent);
    } catch (error) {
      console.error('Error reading CSS file:', error);
      return '';
    }
  };

  // Load CSS content when component mounts or textClass changes
  useEffect(() => {
    const loadCSS = async () => {
      setIsLoadingCSS(true);
      const content = await readCSSFile(textClass.cssFile);
      if (content) {
        setCssContent(content);
      } else {
        // Fallback content
        const className = `.text-${textClass.id}`;
        let fallbackCSS = `${className} {
  /* CSS properties defined in ${textClass.cssFile} */
  /* Could not load the CSS file */
}`;
        if (textClass.usesData) {
          fallbackCSS += `

${className}::before,
${className}::after {
  /* May use content: attr(data-text); */
  /* Check ${textClass.cssFile} for complete pseudo-element styles */
}`;
        }
        setCssContent(fallbackCSS);
      }
      setIsLoadingCSS(false);
    };

    loadCSS();
  }, [textClass.cssFile, textClass.id, textClass.usesData]);

  const generateCSSOutput = () => {
    if (isLoadingCSS) {
      return 'Loading CSS content...';
    }
    return cssContent;
  };

    // Handle background styling like in TextClassCard
  const getBackgroundStyle = (): CSSProperties & { [key: string]: any } => {
    if (!textClass.background) return {};

    if (textClass.background && textClass.background.startsWith('#')) {
      return { '--bloc-color': textClass.background };
    }
    return {};
  };

  const getBackgroundClass = () => {
    return ''

    if (!textClass.background) return '';

    if (textClass.background && textClass.background.startsWith('#')) {
      return 'bloc';
    }
    return `bloc bg-${textClass.background || ''}`;
  };

  // Get background style based on selection
  const getPreviewBackgroundStyle = (): CSSProperties => {
    const selectedOption = backgroundOptions.find(opt => opt.id === selectedBackground);
    if (selectedOption) {
      return selectedOption.style;
    }
    return { backgroundColor: '#ffffff' };
  };

  const getPreviewBackgroundClass = (): string => {
    const selectedOption = backgroundOptions.find(opt => opt.id === selectedBackground);
    if (selectedOption) {
      return selectedOption.class;
    }
    return '';
  };

  return (
    <>

      {/* Header with text preview */}
      <div className={`bg-background ${getPreviewBackgroundClass()} relative aspect-4/2 border border-border rounded-md flex items-center justify-center overflow-hidden`}>
        {/* Large text preview */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h2 className="type-demo-large">
            <span
              contentEditable={true}
              className={`text-${textClass.id} shadow-red-600 select-none`}
              /*{...(textClass.usesData ? { 'data-text': textClass.previewText } : {})}*/
              {...(textClass.usesData ? { 'data-text': 'WordArt' } : {})}
            >
              {/*textClass.previewText*/}
              WordArt
            </span>
          </h2>
        </div>
      </div>

      {/* Style variants */}
      {console.log('textClass.cssVariants:', textClass.cssVariants)}
      {textClass.cssVariants && textClass.cssVariants.length > 0 && (
        <div className="mt-2">
          <div className="flex gap-2">
            {textClass.cssVariants.map((variant) => (
              <div key={variant} className="flex-1 relative overflow-hidden">
                <div className={`bg-background ${getPreviewBackgroundClass()} border border-border rounded-md flex items-center justify-center py-12`}>
                  <h2 className="type-demo-medium">
                    <span
                      className={`text-${textClass.id} ${variant} select-none`}
                      {...(textClass.usesData ? { 'data-text': "Aa" } : {})}
                    >
                      Aa
                    </span>
                  </h2>
                </div>
                <div className="absolute bottom-1 left-1 right-1 text-xs opacity-40 _bg-background/80 _backdrop-blur-sm rounded px-1 py-0.5 text-right">
                  {variant}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between mt-4">
          {/* Background Selector */}
          <div className="flex gap-2 items-center">
            {backgroundOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedBackground(option.id)}
                className={`
                  relative w-6 h-6 rounded-full transition-all hover:scale-110 border border-border
                  ${selectedBackground === option.id ? 'ring-1 ring-primary ring-offset-2 ring-offset-background' : ''}
                `}
              >
                <div className={`absolute inset-0 rounded-full bg-background ${option.class}`} />
              </button>
            ))}
            <span className="hidden md:block text-sm text-muted-foreground px-2">{selectedBackground}</span>
          </div>
          {/* Tags */}
          <div className="hidden _flex flex-wrap gap-2">
            {textClass.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            <Badge variant="secondary" className="text-xs">
              {textClass.category}
            </Badge>
          </div>
      </div>

      {/* Content */}
      <div className="py-8">



        {/* CSS Class */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-primary/40 mb-2">CSS Class</h3>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => copyToClipboard(generateCSSClass(), 'CSS class')}
            className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
            type="button"
          >
            <code className="text-sm break-all">{generateCSSClass()}</code>
            <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        {/* HTML Usage */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-primary/40 mb-2">HTML Usage</h3>
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => copyToClipboard(generateUsageHTML(), 'HTML usage')}
            className="w-full p-4 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
            type="button"
          >
            <pre className="text-sm font-mono whitespace-pre-wrap">{generateUsageHTML()}</pre>
            <Copy className="absolute right-3 top-4 w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        {/* CSS File */}
        <div className="hidden mb-6">
          <h3 className="font-medium text-sm text-primary/40 mb-2">CSS File</h3>
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => copyToClipboard(`@/text/${textClass.cssFile}`, 'CSS file path')}
            className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
            type="button"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <code className="text-sm">@/text/{textClass.cssFile}</code>
            </div>
            <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        {/* CSS Output */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-primary/40 mb-2">CSS Output</h3>
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => copyToClipboard(generateCSSOutput(), 'CSS output')}
            className="w-full p-4 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
            type="button"
          >
            <pre className="text-sm font-mono whitespace-pre-wrap">{generateCSSOutput()}</pre>
            <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        <Separator className="my-6" />



        {/* Usage Examples */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Examples</h3>
            <div className="space-y-2">


              <div className="p-3 bg-muted/50 rounded-lg p-4">
                <h2 className="type-demo text-red-600">
                  <span
                    className={`text-${textClass.id} current text-center`}
                    {...(textClass.usesData ? { 'data-text': 'HELLO WORLD' } : {})}
                  >
                    HELLO WORLD
                  </span>
                </h2>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg p-4">
                <h2 className="type-demo">
                  <span
                    className={`text-${textClass.id} text-center`}
                    {...(textClass.usesData ? { 'data-text': 'HELLO WORLD' } : {})}
                  >
                    HELLO WORLD
                  </span>
                </h2>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg p-4">
                <h2 className="type-demo">
                  <span
                    className={`text-${textClass.id} text-center`}
                    {...(textClass.usesData ? { 'data-text': 'Design Gallery' } : {})}
                  >
                    Design Gallery
                  </span>
                </h2>
              </div>

            </div>
          </div>
        </div>

        {/* Special note for data attributes */}
        {textClass.usesData && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">📝 Note</h4>
            <p className="text-sm text-blue-700">
              This effect requires the <code className="bg-blue-100 px-1 rounded">data-text</code> attribute
              with the same content as the element text for proper rendering.
            </p>
          </div>
        )}
      </div>

    </>
  );
}