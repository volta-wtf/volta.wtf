import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Copy, Plus, Trash2, Palette, Tag, Eye, EyeOff, X } from 'lucide-react';
import { toast } from 'sonner';

interface Shadow {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius?: number; // Only for box-shadow
  color: string;
  enabled: boolean;
}

interface CSSShadowEditorProps {
  name: string;
  onNameChange: (name: string) => void;
  cssClass: string;
  onCssClassChange: (cssClass: string) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  shadows: Shadow[];
  onShadowsChange: (shadows: Shadow[]) => void;
  shadowType: 'text' | 'box';
  previewElement?: React.ReactNode;
}

export function CSSShadowEditor({
  name,
  onNameChange,
  cssClass,
  onCssClassChange,
  tags,
  onTagsChange,
  shadows,
  onShadowsChange,
  shadowType,
  previewElement
}: CSSShadowEditorProps) {
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState<{ index: number; value: string } | null>(null);

  const addShadow = () => {
    const newShadow: Shadow = {
      id: `shadow-${Date.now()}`,
      offsetX: 0,
      offsetY: 4,
      blurRadius: 8,
      spreadRadius: shadowType === 'box' ? 0 : undefined,
      color: '#000000',
      enabled: true
    };
    onShadowsChange([...shadows, newShadow]);
  };

  const updateShadow = (id: string, updates: Partial<Shadow>) => {
    onShadowsChange(shadows.map(shadow =>
      shadow.id === id ? { ...shadow, ...updates } : shadow
    ));
  };

  const removeShadow = (id: string) => {
    onShadowsChange(shadows.filter(shadow => shadow.id !== id));
  };

  const toggleShadow = (id: string) => {
    updateShadow(id, { enabled: !shadows.find(s => s.id === id)?.enabled });
  };

  const generateShadowCSS = (): string => {
    const enabledShadows = shadows.filter(shadow => shadow.enabled);
    if (enabledShadows.length === 0) return 'none';

    return enabledShadows.map(shadow => {
      const { offsetX, offsetY, blurRadius, spreadRadius, color } = shadow;
      const parts = [
        `${offsetX}px`,
        `${offsetY}px`,
        `${blurRadius}px`
      ];

      if (shadowType === 'box' && spreadRadius !== undefined) {
        parts.push(`${spreadRadius}px`);
      }

      parts.push(color);
      return parts.join(' ');
    }).join(', ');
  };

  const generateCSSOutput = (): string => {
    const shadowCSS = generateShadowCSS();
    const property = shadowType === 'text' ? 'text-shadow' : 'box-shadow';

    return `.${cssClass} {
  ${property}: ${shadowCSS};
}`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSSOutput());
    toast.success('CSS copied to clipboard!');
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  const startEditingTag = (index: number) => {
    setEditingTag({ index, value: tags[index] ?? '' });
  };

  const saveEditingTag = () => {
    if (editingTag && editingTag.value.trim()) {
      const newTags = [...tags];
      newTags[editingTag.index] = editingTag.value.trim();
      onTagsChange(newTags);
    }
    setEditingTag(null);
  };

  const cancelEditingTag = () => {
    setEditingTag(null);
  };

  const currentShadowStyle = {
    [shadowType === 'text' ? 'textShadow' : 'boxShadow']: generateShadowCSS()
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Palette className="w-4 h-4" />
          {shadowType === 'text' ? 'Text' : 'Box'} Shadow Editor
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={copyCSS}
          className="gap-2"
          type="button"
        >
          <Copy className="w-3 h-3" />
          Copy CSS
        </Button>
      </div>

      {/* Name Editor */}
      <div className="space-y-2">
        <Label className="text-sm">Name</Label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter style name..."
        />
      </div>

      {/* CSS Class Editor */}
      <div className="space-y-2">
        <Label className="text-sm">CSS Class</Label>
        <Input
          value={cssClass}
          onChange={(e) => onCssClassChange(e.target.value)}
          placeholder="Enter CSS class name..."
        />
      </div>

      {/* Tags Editor */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm">Tags</Label>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center"
            >
              {editingTag?.index === index ? (
                <div className="flex items-center gap-1 bg-muted rounded-full px-2 py-1">
                  <Input
                    value={editingTag.value}
                    onChange={(e) => setEditingTag({ ...editingTag, value: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEditingTag();
                      if (e.key === 'Escape') cancelEditingTag();
                    }}
                    className="text-xs h-auto border-none bg-transparent p-0 focus-visible:ring-0 min-w-16"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={saveEditingTag}
                    className="h-auto p-0.5"
                    type="button"
                  >
                    ✓
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={cancelEditingTag}
                    className="h-auto p-0.5"
                    type="button"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <Badge
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-muted/50 group"
                  onClick={() => startEditingTag(index)}
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(index);
                    }}
                    className="h-auto p-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    type="button"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add new tag..."
            className="text-sm"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={addTag}
            disabled={!newTag.trim()}
            type="button"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Preview */}
      {previewElement && (
        <div className="space-y-2">
          <Label className="text-sm">Preview</Label>
          <div className="p-6 bg-muted/30 rounded-lg flex items-center justify-center">
            <div style={currentShadowStyle}>
              {previewElement}
            </div>
          </div>
        </div>
      )}

      {/* Shadows List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Shadows ({shadows.length})</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={addShadow}
            className="gap-2"
            type="button"
          >
            <Plus className="w-3 h-3" />
            Add Shadow
          </Button>
        </div>

        <AnimatePresence>
          {shadows.map((shadow, index) => (
            <motion.div
              key={shadow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 border rounded-lg space-y-4 ${
                shadow.enabled ? 'bg-background' : 'bg-muted/20 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Shadow {index + 1}</span>
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: shadow.color }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleShadow(shadow.id)}
                    className="h-auto p-1"
                    type="button"
                  >
                    {shadow.enabled ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeShadow(shadow.id)}
                    className="h-auto p-1 text-destructive hover:text-destructive"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Offset X */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Offset X</Label>
                    <span className="text-xs text-muted-foreground">{shadow.offsetX}px</span>
                  </div>
                  <Slider
                    value={[shadow.offsetX]}
                    onValueChange={([value]) => updateShadow(shadow.id, { offsetX: value })}
                    min={-50}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Offset Y */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Offset Y</Label>
                    <span className="text-xs text-muted-foreground">{shadow.offsetY}px</span>
                  </div>
                  <Slider
                    value={[shadow.offsetY]}
                    onValueChange={([value]) => updateShadow(shadow.id, { offsetY: value })}
                    min={-50}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Blur Radius */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Blur</Label>
                    <span className="text-xs text-muted-foreground">{shadow.blurRadius}px</span>
                  </div>
                  <Slider
                    value={[shadow.blurRadius]}
                    onValueChange={([value]) => updateShadow(shadow.id, { blurRadius: value })}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Spread Radius (Box Shadow Only) */}
                {shadowType === 'box' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Spread</Label>
                      <span className="text-xs text-muted-foreground">{shadow.spreadRadius}px</span>
                    </div>
                    <Slider
                      value={[shadow.spreadRadius || 0]}
                      onValueChange={([value]) => updateShadow(shadow.id, { spreadRadius: value })}
                      min={-20}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Color */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm">Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded border-2 border-border cursor-pointer"
                      style={{ backgroundColor: shadow.color }}
                    />
                    <Input
                      value={shadow.color}
                      onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {shadows.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No shadows added yet.</p>
            <p className="text-sm">Click "Add Shadow" to get started.</p>
          </div>
        )}
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <Label className="text-sm">Generated CSS</Label>
        <div className="p-4 bg-muted rounded-lg border">
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
            {generateCSSOutput()}
          </pre>
        </div>
      </div>
    </div>
  );
}