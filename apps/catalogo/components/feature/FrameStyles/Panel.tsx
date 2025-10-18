import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { X, Copy, Frame, Tag, Plus, Trash2, Edit2, RotateCcw } from 'lucide-react';
import { toast } from "@/components/ui/toaster";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CSSPropertyEditor } from '@/components/feature/Editor/CSSProperty';
import { CSSShadowEditor } from '@/components/feature/Editor/CSSShadow';
import type { FrameStyle, Shadow } from '@/types';

interface FrameStylePanelProps {
  frameStyle: FrameStyle;
  onClose: () => void;
  onDuplicate?: (frameStyle: FrameStyle) => void;
  onUpdate?: (frameStyle: FrameStyle) => void;
}

const frameStyleCategories = ['Modern', 'Industrial', 'Retro', 'Natural', 'Luxury', 'Textile', 'Liquid', 'Futuristic', 'Custom', 'Modified'];
const materialTypes = ['Glass', 'Metal', 'Wood', 'Crystal', 'Fabric', 'Energy', 'Liquid', 'Hologram', 'Stone', 'Ceramic'];

function parseBoxShadows(boxShadow: string | undefined): Shadow[] {
  if (!boxShadow || boxShadow === 'none') return [];

  // Simple parsing for box-shadow values
  const shadows = boxShadow.split(',').map((shadow, index) => {
    const parts = shadow.trim().split(/\s+/);
    let offsetX = 0, offsetY = 0, blurRadius = 0, spreadRadius = 0, color = '#000000';

    // Parse shadow parts (can be in different orders)
    let colorFound = false;
    let numValues = 0;

    for (const part of parts) {
      if (part.startsWith('#') || part.startsWith('rgb') || part.startsWith('rgba')) {
        color = part;
        colorFound = true;
      } else if (!colorFound && !isNaN(parseInt(part))) {
        const value = parseInt(part);
        switch (numValues) {
          case 0: offsetX = value; break;
          case 1: offsetY = value; break;
          case 2: blurRadius = value; break;
          case 3: spreadRadius = value; break;
        }
        numValues++;
      }
    }

    return {
      id: `shadow-${index}`,
      offsetX,
      offsetY,
      blurRadius,
      spreadRadius,
      color,
      enabled: true
    };
  });

  return shadows;
}

function generateBoxShadow(shadows: Shadow[]): string {
  const enabledShadows = shadows.filter(shadow => shadow.enabled);
  if (enabledShadows.length === 0) return 'none';

  return enabledShadows.map(shadow =>
    `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${shadow.color}`
  ).join(', ');
}

export function FrameStylePanel({ frameStyle, onClose, onDuplicate, onUpdate }: FrameStylePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFrameStyle, setEditedFrameStyle] = useState(frameStyle);
  const [shadows, setShadows] = useState<Shadow[]>(() =>
    parseBoxShadows(frameStyle.style.boxShadow as string)
  );
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState<{ index: number; value: string } | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDuplicate) {
      onDuplicate(frameStyle);
      toast.success('Frame style duplicated as custom item!');
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUpdate) {
      // Update frame style with shadow changes
      const updatedStyle = {
        ...editedFrameStyle,
        style: {
          ...editedFrameStyle.style,
          boxShadow: generateBoxShadow(shadows)
        }
      };
      onUpdate(updatedStyle);
      toast.success('Frame style updated successfully!');
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
    setEditedFrameStyle(frameStyle);
    setShadows(parseBoxShadows(frameStyle.style.boxShadow as string));
    setIsEditing(false);
    setEditingTag(null);
    setNewTag('');
  };

  const handleStyleChange = (newStyle: React.CSSProperties) => {
    setEditedFrameStyle(prev => ({
      ...prev,
      style: newStyle
    }));
  };

  const handleShadowsChange = (newShadows: Shadow[]) => {
    setShadows(newShadows);
    // Update the style immediately for preview
    const newBoxShadow = generateBoxShadow(newShadows);
    setEditedFrameStyle(prev => ({
      ...prev,
      style: {
        ...prev.style,
        boxShadow: newBoxShadow
      }
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !editedFrameStyle.tags.includes(newTag.trim())) {
      setEditedFrameStyle(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setEditedFrameStyle(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const startEditingTag = (index: number) => {
    setEditingTag({ index, value: editedFrameStyle.tags[index] ?? '' });
  };

  const saveEditingTag = () => {
    if (editingTag && editingTag.value.trim()) {
      const newTags = [...editedFrameStyle.tags];
      newTags[editingTag.index] = editingTag.value.trim();
      setEditedFrameStyle(prev => ({ ...prev, tags: newTags }));
    }
    setEditingTag(null);
  };

  const cancelEditingTag = () => {
    setEditingTag(null);
  };

  const generateCSSOutput = () => {
    const cssProperties = Object.entries(editedFrameStyle.style)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');

    return `.frame-style-${editedFrameStyle.id.replace(/[^a-zA-Z0-9]/g, '-')} {
${cssProperties}
}`;
  };

  const handleCopyCSS = () => {
    copyToClipboard(generateCSSOutput(), 'CSS output');
  };

  const currentFrameStyle = isEditing ? editedFrameStyle : frameStyle;
  const canEdit = true; // Now all frame styles can be edited
  const showEditButton = canEdit && !isEditing;
  const showDuplicateButton = !isEditing && onDuplicate && !frameStyle.isCustom;

  return (
    <div className="w-full">
      {/* Header with frame preview */}
      <div className="relative aspect-4/3 border border-border rounded-md flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors z-10"
          type="button"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Status badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
            {currentFrameStyle.category}
          </Badge>
          {currentFrameStyle.isCustom && (
            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
              Custom
            </Badge>
          )}
          {(currentFrameStyle as any).isModified && (
            <Badge variant="outline" className="bg-yellow-500/20 backdrop-blur-sm border-yellow-400/40">
              Modified
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
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

        {/* Large frame preview */}
        <div
          className="w-32 h-32 rounded-lg relative"
          style={currentFrameStyle.style}
        >
          <div className="absolute inset-4 bg-white/20 rounded flex items-center justify-center">
            <div className="w-8 h-8 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {!isEditing ? (
          /* View Mode */
          <>
            <div className="flex items-center gap-3 mb-4">
              <Frame className="w-6 h-6 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">{currentFrameStyle.name}</h2>
            </div>

            <p className="text-muted-foreground mb-6">{currentFrameStyle.description}</p>

            {/* Material Type */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Material</h3>
              <Badge variant="outline" className="text-sm">
                {currentFrameStyle.material}
              </Badge>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentFrameStyle.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CSS Class */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">CSS Class</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => copyToClipboard(currentFrameStyle.cssClass, 'CSS class')}
                className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                type="button"
              >
                <code className="text-sm break-all">{currentFrameStyle.cssClass}</code>
                <Copy className="w-4 h-4 float-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>

            {/* CSS Properties */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">CSS Properties</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => copyToClipboard(JSON.stringify(currentFrameStyle.style, null, 2), 'CSS properties')}
                className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                type="button"
              >
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {JSON.stringify(currentFrameStyle.style, null, 2)}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 flex items-center justify-center">
                    <div
                      className="w-full h-full rounded"
                      style={currentFrameStyle.style}
                    >
                      <div className="w-full h-full bg-white/20 rounded flex items-center justify-center">
                        <div className="text-white/60 text-xs">Content</div>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex items-center justify-center">
                    <div
                      className="w-full h-full rounded"
                      style={currentFrameStyle.style}
                    >
                      <div className="w-full h-full bg-white/20 rounded flex items-center justify-center">
                        <div className="text-white/60 text-xs">Image</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Edit Mode */
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="shadows">Box Shadows</TabsTrigger>
              <TabsTrigger value="properties">CSS Properties</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm">Name</Label>
                <Input
                  value={editedFrameStyle.name}
                  onChange={(e) => setEditedFrameStyle(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter frame style name..."
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={editedFrameStyle.description}
                  onChange={(e) => setEditedFrameStyle(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter frame style description..."
                  rows={3}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm">Category</Label>
                <Select
                  value={editedFrameStyle.category}
                  onValueChange={(value) => setEditedFrameStyle(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameStyleCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Material */}
              <div className="space-y-2">
                <Label className="text-sm">Material Type</Label>
                <Select
                  value={editedFrameStyle.material}
                  onValueChange={(value) => setEditedFrameStyle(prev => ({ ...prev, material: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialTypes.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* CSS Class */}
              <div className="space-y-2">
                <Label className="text-sm">CSS Class</Label>
                <Input
                  value={editedFrameStyle.cssClass}
                  onChange={(e) => setEditedFrameStyle(prev => ({ ...prev, cssClass: e.target.value }))}
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
                  <AnimatePresence>
                    {editedFrameStyle.tags.map((tag, index) => (
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
                  </AnimatePresence>
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
            </TabsContent>

            <TabsContent value="shadows" className="space-y-6">
              <CSSShadowEditor
                name={editedFrameStyle.name}
                onNameChange={(name) => setEditedFrameStyle(prev => ({ ...prev, name }))}
                cssClass={editedFrameStyle.cssClass}
                onCssClassChange={(cssClass) => setEditedFrameStyle(prev => ({ ...prev, cssClass }))}
                tags={editedFrameStyle.tags}
                onTagsChange={(tags) => setEditedFrameStyle(prev => ({ ...prev, tags }))}
                shadows={shadows}
                onShadowsChange={handleShadowsChange}
                shadowType="box"
                previewElement={
                  <div
                    className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200"
                    style={{ ...currentFrameStyle.style }}
                  >
                    <div className="w-full h-full bg-white/20 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/60 rounded-full" />
                    </div>
                  </div>
                }
              />
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              <CSSPropertyEditor
                properties={editedFrameStyle.style}
                onPropertiesChange={handleStyleChange}
                onCopyCSS={handleCopyCSS}
              />
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              {/* Frame Preview */}
              <div className="space-y-2">
                <Label className="text-sm">Frame Preview</Label>
                <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                  <div
                    className="w-32 h-32 rounded-lg relative"
                    style={editedFrameStyle.style}
                  >
                    <div className="absolute inset-4 bg-white/20 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS Output Preview */}
              <div className="space-y-2">
                <Label className="text-sm">CSS Output Preview</Label>
                <div className="p-4 bg-muted rounded-lg border">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                    {generateCSSOutput()}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}