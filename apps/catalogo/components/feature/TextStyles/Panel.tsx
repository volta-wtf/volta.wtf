import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { Copy, Plus, Edit2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CSSPropertyEditor } from '@/components/feature/Editor/CSSProperty';
import { CSSShadowEditor } from '@/components/feature/Editor/CSSShadow';
import type { TextStyle } from '@/types';

interface Shadow {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  color: string;
  enabled: boolean;
}

interface TextStylePanelProps {
  textStyle: TextStyle;
  onClose: () => void;
  onDuplicate?: (textStyle: TextStyle) => void;
  onUpdate?: (textStyle: TextStyle) => void;
}

function parseTextShadows(textShadow: string | undefined): Shadow[] {
  if (!textShadow || textShadow === 'none') return [];

  // Simple parsing for text-shadow values
  const shadows = textShadow.split(',').map((shadow, index) => {
    const parts = shadow.trim().split(/\s+/);
    const offsetX = parseInt(parts[0] || '0') || 0;
    const offsetY = parseInt(parts[1] || '0') || 0;
    const blurRadius = parseInt(parts[2] || '0') || 0;
    const color = parts[3] || '#000000';

    return {
      id: `shadow-${index}`,
      offsetX,
      offsetY,
      blurRadius,
      color,
      enabled: true
    };
  });

  return shadows;
}

function generateTextShadow(shadows: Shadow[]): string {
  const enabledShadows = shadows.filter(shadow => shadow.enabled);
  if (enabledShadows.length === 0) return 'none';

  return enabledShadows.map(shadow =>
    `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`
  ).join(', ');
}

// Utility function to inject CSS for pseudo-elements
function injectTextStyleCSS(textStyle: TextStyle) {
  const { id, style, before, after } = textStyle;
  const className = `text-style-${id.replace(/[^a-zA-Z0-9]/g, '-')}`;

  // Check if style already exists
  const existingStyle = document.getElementById(`text-style-${id}`);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Generate CSS
  const cssProperties = Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${cssKey}: ${value};`;
    })
    .join('\n');

  let cssText = `.${className} {
${cssProperties}
}`;

  // Add pseudo-elements if they exist
  if (before) {
    const { content, ...beforeStyles } = before;
    const beforeProperties = Object.entries(beforeStyles)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    const beforeContentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
    cssText += `\n\n.${className}::before {
  content: ${beforeContentValue};
${beforeProperties}
}`;
  }

  if (after) {
    const { content, ...afterStyles } = after;
    const afterProperties = Object.entries(afterStyles)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    const afterContentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
    cssText += `\n\n.${className}::after {
  content: ${afterContentValue};
${afterProperties}
}`;
  }

  // Inject CSS
  const styleElement = document.createElement('style');
  styleElement.id = `text-style-${id}`;
  styleElement.textContent = cssText;
  document.head.appendChild(styleElement);

  return className;
}

export function TextStylePanel({ textStyle, onClose, onDuplicate, onUpdate }: TextStylePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTextStyle, setEditedTextStyle] = useState(textStyle);
  const [shadows, setShadows] = useState<Shadow[]>(() =>
    parseTextShadows(textStyle.style.textShadow as string)
  );

  // Inject CSS for pseudo-elements when component mounts or textStyle changes
  useEffect(() => {
    if (textStyle.before || textStyle.after) {
      injectTextStyleCSS(textStyle);
    }
  }, [textStyle]);

  // Inject CSS for edited text style when it has pseudo-elements
  useEffect(() => {
    if (editedTextStyle.before || editedTextStyle.after) {
      injectTextStyleCSS(editedTextStyle);
    }
  }, [editedTextStyle]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDuplicate) {
      onDuplicate(textStyle);
      toast.success('Text style duplicated as custom item!');
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUpdate) {
      // Update text style with shadow changes
      const updatedStyle = {
        ...editedTextStyle,
        style: {
          ...editedTextStyle.style,
          textShadow: generateTextShadow(shadows)
        }
      };
      onUpdate(updatedStyle);
      toast.success('Text style updated successfully!');
    }
    setIsEditing(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditedTextStyle(textStyle);
    setShadows(parseTextShadows(textStyle.style.textShadow as string));
    setIsEditing(false);
  };

  const handleStyleChange = (newStyle: React.CSSProperties) => {
    setEditedTextStyle(prev => ({
      ...prev,
      style: newStyle
    }));
  };

  const handleShadowsChange = (newShadows: Shadow[]) => {
    setShadows(newShadows);
    // Update the style immediately for preview
    const newTextShadow = generateTextShadow(newShadows);
    setEditedTextStyle(prev => ({
      ...prev,
      style: {
        ...prev.style,
        textShadow: newTextShadow
      }
    }));
  };

  const generateCSSOutput = () => {
    const styleToUse = isEditing ? editedTextStyle : currentTextStyle;
    const cssProperties = Object.entries(styleToUse.style)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    const className = `.text-${styleToUse.cssClass.replace(/[^a-zA-Z0-9]/g, '-')}`;

    let cssOutput = `${className} {
${cssProperties}
}`;

        // Add pseudo-elements if they exist
    if (styleToUse.before) {
      const { content, ...beforeStyles } = styleToUse.before;
      const beforeProperties = Object.entries(beforeStyles)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `  ${cssKey}: ${value};`;
        })
        .join('\n');

      const contentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
      cssOutput += `\n\n${className}::before {
  content: ${contentValue};${beforeProperties ? '\n' + beforeProperties : ''}
}`;
    }

    if (styleToUse.after) {
      const { content, ...afterStyles } = styleToUse.after;
      const afterProperties = Object.entries(afterStyles)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `  ${cssKey}: ${value};`;
        })
        .join('\n');

      const contentValue = content?.startsWith('attr(') ? content : `"${content || ''}"`;
      cssOutput += `\n\n${className}::after {
  content: ${contentValue};${afterProperties ? '\n' + afterProperties : ''}
}`;
    }

    return cssOutput;
  };

  const generateFullProperties = () => {
    const fullProps: any = {
      style: currentTextStyle.style
    };

    if (currentTextStyle.before) {
      fullProps.before = currentTextStyle.before;
    }

    if (currentTextStyle.after) {
      fullProps.after = currentTextStyle.after;
    }

    return JSON.stringify(fullProps, null, 2);
  };

  const handleCopyCSS = () => {
    copyToClipboard(generateCSSOutput(), 'CSS output');
  };

  const currentTextStyle = isEditing ? editedTextStyle : textStyle;
  const canEdit = true; // Now all text styles can be edited
  const showEditButton = canEdit && !isEditing;
  const showDuplicateButton = !isEditing && onDuplicate && !textStyle.isCustom;

  return (
      <div>

        {/* Header with text preview */}
        <div className="relative aspect-4/2 border border-border rounded-md flex items-center justify-center">

          {/* Status badges
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
              {currentTextStyle.category}
            </Badge>
            {currentTextStyle.isCustom && (
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
                Custom
              </Badge>
            )}
            {currentTextStyle.isModified && (
              <Badge variant="outline" className="bg-yellow-500/20 backdrop-blur-sm border-yellow-400/40">
                Modified
              </Badge>
            )}
          </div>
          */}

          {/* Large text preview */}
          <div
            className={`text-center select-none pointer-events-none text-8xl ${
              (currentTextStyle.before || currentTextStyle.after) ? `text-style-${currentTextStyle.id.replace(/[^a-zA-Z0-9]/g, '-')}` : ''
            }`}
            style={(currentTextStyle.before || currentTextStyle.after) ? {} : currentTextStyle.style}
            {...(currentTextStyle.usesDataText ? { 'data-text': currentTextStyle.previewText } : {})}
          >
              {currentTextStyle.previewText}
          </div>
        </div>

        {/* Content */}
        <div className="py-8">
          {!isEditing && (
            <>
              {/* Tags */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentTextStyle.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* Action buttons */}
                <div className="flex gap-2">
                  {showDuplicateButton && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleDuplicate}
                      className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                      type="button"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Duplicate
                    </Button>
                  )}

                  {canEdit && (
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCancel}
                            className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                            type="button"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleSave}
                            className="bg-green-500/20 backdrop-blur-sm border-green-400/40 hover:bg-green-500/30"
                            type="button"
                          >
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        showEditButton && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleEdit}
                            className="bg-white/50 backdrop-blur-sm hover:bg-white/70"
                            type="button"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        )
                      )}
                    </div>
              )}
              </div>
              </div>

              {/* CSS Class */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">CSS Class</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard(currentTextStyle.cssClass, 'CSS class')}
                  className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                  type="button"
                >
                  <code className="text-sm break-all">{currentTextStyle.cssClass}</code>
                  <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              {/* CSS Properties */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">CSS Properties</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard(generateFullProperties(), 'CSS properties')}
                  className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                  type="button"
                >
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {generateFullProperties()}
                  </pre>
                  <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              <Separator className="my-6" />

              {/* CSS Output */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">CSS Output</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyCSS}
                  className="w-full p-4 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                  type="button"
                >
                  <pre className="text-sm font-mono whitespace-pre-wrap">{generateCSSOutput()}</pre>
                  <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              {/* Usage Examples */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Examples</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div
                        className={`text-center ${
                          (currentTextStyle.before || currentTextStyle.after) ? `text-style-${currentTextStyle.id.replace(/[^a-zA-Z0-9]/g, '-')}` : ''
                        }`}
                        style={(currentTextStyle.before || currentTextStyle.after) ? {} : currentTextStyle.style}
                        {...(currentTextStyle.usesDataText ? { 'data-text': 'HELLO WORLD' } : {})}
                      >
                        HELLO WORLD
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div
                        className={`text-center ${
                          (currentTextStyle.before || currentTextStyle.after) ? `text-style-${currentTextStyle.id.replace(/[^a-zA-Z0-9]/g, '-')}` : ''
                        }`}
                        style={(currentTextStyle.before || currentTextStyle.after) ? {} : currentTextStyle.style}
                        {...(currentTextStyle.usesDataText ? { 'data-text': 'Design Gallery' } : {})}
                      >
                        Design Gallery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Editing Interface */}
          {isEditing && (
            <Tabs defaultValue="shadows" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shadows">Text Shadows</TabsTrigger>
                <TabsTrigger value="properties">CSS Properties</TabsTrigger>
              </TabsList>

              <TabsContent value="shadows" className="space-y-6">
                <CSSShadowEditor
                  name={editedTextStyle.name}
                  onNameChange={(name) => setEditedTextStyle(prev => ({ ...prev, name }))}
                  cssClass={editedTextStyle.cssClass}
                  onCssClassChange={(cssClass) => setEditedTextStyle(prev => ({ ...prev, cssClass }))}
                  tags={editedTextStyle.tags}
                  onTagsChange={(tags) => setEditedTextStyle(prev => ({ ...prev, tags }))}
                  shadows={shadows}
                  onShadowsChange={handleShadowsChange}
                  shadowType="text"
                  previewElement={
                    <div
                      className={`text-4xl font-bold ${
                        (editedTextStyle.before || editedTextStyle.after) ? `text-style-${editedTextStyle.id.replace(/[^a-zA-Z0-9]/g, '-')}` : ''
                      }`}
                      style={(editedTextStyle.before || editedTextStyle.after) ? {} : editedTextStyle.style}
                      {...(editedTextStyle.usesDataText ? { 'data-text': editedTextStyle.previewText } : {})}
                    >
                      {editedTextStyle.previewText}
                    </div>
                  }
                />
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <CSSPropertyEditor
                  properties={editedTextStyle.style}
                  onPropertiesChange={handleStyleChange}
                  onCopyCSS={handleCopyCSS}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>

      </div>
  );
}