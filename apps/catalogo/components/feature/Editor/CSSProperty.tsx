import { useState } from 'react';
import { motion } from '@/lib/motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Copy, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface CSSPropertyEditorProps {
  properties: React.CSSProperties;
  onPropertiesChange: (properties: React.CSSProperties) => void;
  onCopyCSS: () => void;
}

export function CSSPropertyEditor({ properties, onPropertiesChange, onCopyCSS }: CSSPropertyEditorProps) {
  const [localProperties, setLocalProperties] = useState(properties);

  const updateProperty = (key: string, value: string | number) => {
    const newProperties = { ...localProperties, [key]: value };
    setLocalProperties(newProperties);
    onPropertiesChange(newProperties);
  };

  const parseNumericValue = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const num = parseFloat(value.replace(/px|em|rem|%/g, ''));
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const formatPropertyName = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const generateCSSText = (props: React.CSSProperties): string => {
    return Object.entries(props)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');
  };

  const handleCopyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCopyCSS();
  };

  const renderPropertyInput = (key: string, value: any) => {
    // Handle numeric properties with sliders
    if (['fontSize', 'letterSpacing', 'borderRadius', 'borderWidth'].includes(key)) {
      const numValue = parseNumericValue(value);
      const max = key === 'fontSize' ? 100 : key === 'letterSpacing' ? 10 : key === 'borderRadius' ? 50 : 20;
      const unit = key === 'fontSize' ? 'px' : key === 'letterSpacing' ? 'px' : 'px';

      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">{formatPropertyName(key)}</Label>
            <span className="text-xs text-muted-foreground">{numValue}{unit}</span>
          </div>
          <Slider
            value={[numValue]}
            onValueChange={([newValue]) => updateProperty(key, `${newValue}${unit}`)}
            max={max}
            min={0}
            step={1}
            className="w-full"
          />
        </div>
      );
    }

    // Handle color properties
    if (['color', 'backgroundColor', 'borderColor'].includes(key) || key.includes('Color')) {
      return (
        <div className="space-y-2">
          <Label className="text-sm">{formatPropertyName(key)}</Label>
          <div className="flex gap-2">
            <div
              className="w-8 h-8 rounded border-2 border-border cursor-pointer"
              style={{ backgroundColor: value as string }}
            />
            <Input
              value={value as string || ''}
              onChange={(e) => updateProperty(key, e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>
      );
    }

    // Handle text properties
    if (['fontWeight', 'textAlign', 'textTransform'].includes(key)) {
      return (
        <div className="space-y-2">
          <Label className="text-sm">{formatPropertyName(key)}</Label>
          <Input
            value={value as string || ''}
            onChange={(e) => updateProperty(key, e.target.value)}
            placeholder="Enter value..."
          />
        </div>
      );
    }

    // Handle complex properties like gradients, shadows, etc.
    return (
      <div className="space-y-2">
        <Label className="text-sm">{formatPropertyName(key)}</Label>
        <Input
          value={value as string || ''}
          onChange={(e) => updateProperty(key, e.target.value)}
          placeholder="Enter CSS value..."
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Palette className="w-4 h-4" />
          CSS Output
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyClick}
          className="gap-2"
          type="button"
        >
          <Copy className="w-3 h-3" />
          Copy CSS
        </Button>
      </div>

      {/* Property Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(localProperties)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-muted/30 rounded-lg"
            >
              {renderPropertyInput(key, value)}
            </motion.div>
          ))}
      </div>

      {/* Generated CSS Output */}
      <div className="space-y-2">
        <Label className="text-sm">Generated CSS</Label>
        <div className="p-4 bg-muted rounded-lg border">
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
{`.custom-style {
${generateCSSText(localProperties)}
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}