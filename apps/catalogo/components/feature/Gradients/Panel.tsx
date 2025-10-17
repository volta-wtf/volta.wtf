import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { X, Copy, Palette, Tag, Plus, Trash2, Edit2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Gradient } from '@/app/gallery/page';

interface GradientPanelProps {
  gradient: Gradient;
  onClose: () => void;
  onDuplicate?: (gradient: Gradient) => void;
  onUpdate?: (gradient: Gradient) => void;
}

const gradientCategories = ['Nature', 'Tech', 'Creative', 'Luxury', 'Travel', 'Wellness', 'Custom', 'Modified'];

export function GradientPanel({ gradient, onClose, onDuplicate, onUpdate }: GradientPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGradient, setEditedGradient] = useState(gradient);
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
      onDuplicate(gradient);
      toast.success('Gradient duplicated as custom item!');
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUpdate) {
      onUpdate(editedGradient);
      toast.success('Gradient updated successfully!');
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
    setEditedGradient(gradient);
    setIsEditing(false);
    setEditingTag(null);
    setNewTag('');
  };

  const addTag = () => {
    if (newTag.trim() && !editedGradient.tags.includes(newTag.trim())) {
      setEditedGradient(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setEditedGradient(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const startEditingTag = (index: number) => {
    setEditingTag({ index, value: editedGradient.tags[index] ?? '' });
  };

  const saveEditingTag = () => {
    if (editingTag && editingTag.value.trim()) {
      const newTags = [...editedGradient.tags];
      newTags[editingTag.index] = editingTag.value.trim();
      setEditedGradient(prev => ({ ...prev, tags: newTags }));
    }
    setEditingTag(null);
  };

  const cancelEditingTag = () => {
    setEditingTag(null);
  };

  const addColor = () => {
    if (editedGradient.colors.length < 8) {
      setEditedGradient(prev => ({
        ...prev,
        colors: [...prev.colors, '#000000']
      }));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...editedGradient.colors];
    newColors[index] = color;
    setEditedGradient(prev => ({
      ...prev,
      colors: newColors,
      gradient: generateGradientFromColors(newColors, extractDirection(prev.gradient))
    }));
  };

  const removeColor = (index: number) => {
    if (editedGradient.colors.length > 2) {
      const newColors = editedGradient.colors.filter((_, i) => i !== index);
      setEditedGradient(prev => ({
        ...prev,
        colors: newColors,
        gradient: generateGradientFromColors(newColors, extractDirection(prev.gradient))
      }));
    }
  };

  const extractDirection = (gradientString: string): string => {
    const match = gradientString.match(/linear-gradient\(([^,]+),/);
    return match && match[1] ? match[1].trim() : '135deg';
  };

  const generateGradientFromColors = (colors: string[], direction: string = '135deg'): string => {
    return `linear-gradient(${direction}, ${colors.join(', ')})`;
  };

  const handleDirectionChange = (direction: string) => {
    const newGradient = generateGradientFromColors(editedGradient.colors, direction);
    setEditedGradient(prev => ({
      ...prev,
      gradient: newGradient
    }));
  };

  const generateCSSOutput = () => {
    return `.gradient-${editedGradient.id.replace(/[^a-zA-Z0-9]/g, '-')} {
  background: ${editedGradient.gradient};
}`;
  };

  const handleCopyCSS = () => {
    copyToClipboard(generateCSSOutput(), 'CSS output');
  };

  const currentGradient = isEditing ? editedGradient : gradient;
  const canEdit = true; // Now all gradients can be edited
  const showEditButton = canEdit && !isEditing;
  const showDuplicateButton = !isEditing && onDuplicate && !gradient.isCustom;

  return (
    <>

      {/* Header with gradient preview */}
      <div
        className="relative aspect-4/2 border border-border rounded-md"
        style={{ background: currentGradient.gradient }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors z-10"
          type="button"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Status badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/20">
            {currentGradient.category}
          </Badge>
          {currentGradient.isCustom && (
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/40">
              Custom
            </Badge>
          )}
          {currentGradient.isModified && (
            <Badge variant="outline" className="bg-yellow-500/20 backdrop-blur-sm text-white border-yellow-400/40">
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
              className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
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
                    className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
                    type="button"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSave}
                    className="bg-green-500/20 backdrop-blur-sm text-white border-green-400/40 hover:bg-green-500/30"
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
                    className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
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

      {/* Content */}
      <div className="p-8">
        {!isEditing ? (
          /* View Mode */
          <>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">{currentGradient.name}</h2>
            </div>

            <p className="text-muted-foreground mb-6">{currentGradient.description}</p>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentGradient.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Color swatches */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Colors</h3>
              <div className="flex gap-3">
                {currentGradient.colors.map((color, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(color, 'Color')}
                    className="group relative"
                    type="button"
                  >
                    <div
                      className="w-16 h-16 rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: color }}
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CSS Gradient */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">CSS Gradient</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => copyToClipboard(currentGradient.gradient, 'CSS gradient')}
                className="w-full p-3 bg-muted rounded-lg text-left hover:bg-muted/80 transition-colors group"
                type="button"
              >
                <code className="text-sm break-all">{currentGradient.gradient}</code>
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

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Inspiration</h3>
                <p className="text-muted-foreground text-sm">{currentGradient.inspiration}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Best Used For</h3>
                <p className="text-muted-foreground text-sm">{currentGradient.usage}</p>
              </div>
            </div>
          </>
        ) : (
          /* Edit Mode */
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="colors">Colors & Gradient</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm">Name</Label>
                <Input
                  value={editedGradient.name}
                  onChange={(e) => setEditedGradient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter gradient name..."
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={editedGradient.description}
                  onChange={(e) => setEditedGradient(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter gradient description..."
                  rows={3}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm">Category</Label>
                <Select
                  value={editedGradient.category}
                  onValueChange={(value) => setEditedGradient(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags Editor */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-sm">Tags</Label>
                </div>

                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {editedGradient.tags.map((tag, index) => (
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

            <TabsContent value="colors" className="space-y-6">
              {/* Color Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Colors ({editedGradient.colors.length})</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addColor}
                    disabled={editedGradient.colors.length >= 8}
                    type="button"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Color
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {editedGradient.colors.map((color, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => updateColor(index, e.target.value)}
                            className="w-10 h-10 rounded border-2 border-border cursor-pointer"
                          />
                          <Input
                            value={color}
                            onChange={(e) => updateColor(index, e.target.value)}
                            placeholder="#000000"
                            className="flex-1 font-mono text-sm"
                          />
                        </div>
                        {editedGradient.colors.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeColor(index)}
                            className="h-auto p-1 text-destructive hover:text-destructive"
                            type="button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Direction */}
              <div className="space-y-4">
                <Label className="text-sm">Direction</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg'].map((deg) => (
                    <Button
                      key={deg}
                      variant="outline"
                      size="sm"
                      onClick={() => handleDirectionChange(deg)}
                      className="text-xs"
                      type="button"
                    >
                      {deg}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Gradient Preview */}
              <div className="space-y-2">
                <Label className="text-sm">Preview</Label>
                <div
                  className="w-full h-32 rounded-lg border"
                  style={{ background: editedGradient.gradient }}
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              {/* Inspiration */}
              <div className="space-y-2">
                <Label className="text-sm">Inspiration</Label>
                <Textarea
                  value={editedGradient.inspiration}
                  onChange={(e) => setEditedGradient(prev => ({ ...prev, inspiration: e.target.value }))}
                  placeholder="What inspired this gradient?"
                  rows={3}
                />
              </div>

              {/* Usage */}
              <div className="space-y-2">
                <Label className="text-sm">Best Used For</Label>
                <Textarea
                  value={editedGradient.usage}
                  onChange={(e) => setEditedGradient(prev => ({ ...prev, usage: e.target.value }))}
                  placeholder="Where should this gradient be used?"
                  rows={3}
                />
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

    </>
  );
}