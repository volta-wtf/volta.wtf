"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Copy, Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toaster";

interface Shadow {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  color: string;
  enabled: boolean;
}

const RAINBOW_COLORS = [
  "#ff0000", // red
  "#ff7f00", // orange
  "#ffff00", // yellow
  "#00ff00", // green
  "#0000ff", // blue
  "#4b0082", // indigo
  "#9400d3", // violet
];

const BACKGROUND_OPTIONS = [
  { id: 'white', name: 'White', color: '#ffffff' },
  { id: 'light-gray', name: 'Light Gray', color: '#f5f5f5' },
  { id: 'gray', name: 'Gray', color: '#808080' },
  { id: 'orange', name: 'Orange', color: '#ff7f00' },
  { id: 'light-blue', name: 'Light Blue', color: '#00bfff' },
  { id: 'light-green', name: 'Light Green', color: '#90ee90' },
  { id: 'teal', name: 'Teal', color: '#add8e6' },
  { id: 'pattern', name: 'Pattern', color: '#ffffff', pattern: true },
];

const PRESET_COLORS = [
  "#000000", // black
  "#ffffff", // white
  "#808080", // gray
  "#ff7f00", // orange
  "#00bfff", // light blue
  "#90ee90", // light green
  "#add8e6", // light blue
  "#ffffff", // white
];

interface WordArtGeneratorProps {
  onModeChange?: (mode: "default" | "pangram" | "wordart") => void;
}

export function WordArtGenerator(props: WordArtGeneratorProps = {}) {
  const { onModeChange } = props;
  const [text, setText] = useState("WordArt");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [selectedBackgroundOption, setSelectedBackgroundOption] = useState('white');
  const [shadows, setShadows] = useState<Shadow[]>(() => {
    // Crear sombras rainbow por defecto
    return RAINBOW_COLORS.map((color, index) => ({
      id: `shadow-${index}`,
      offsetX: 2,
      offsetY: 2 + index * 2,
      blurRadius: 0,
      color,
      enabled: true,
    }));
  });
  const [selectedStyle, setSelectedStyle] = useState<"clear" | "inverse" | "default">("default");

  const generateShadowCSS = (): string => {
    const enabledShadows = shadows.filter((shadow) => shadow.enabled);
    if (enabledShadows.length === 0) return "none";

    return enabledShadows
      .map(
        (shadow) =>
          `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`
      )
      .join(", ");
  };

  const getTextStyle = (style: "clear" | "inverse" | "default") => {
    const baseStyle: React.CSSProperties = {
      textShadow: generateShadowCSS(),
    };

    switch (style) {
      case "clear":
        return {
          ...baseStyle,
          color: "transparent",
        };
      case "inverse":
        return {
          ...baseStyle,
          color: textColor,
          textShadow: shadows
            .filter((s) => s.enabled)
            .reverse()
            .map(
              (shadow) =>
                `${-shadow.offsetX}px ${-shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`
            )
            .join(", "),
        };
      default:
        return {
          ...baseStyle,
          color: textColor,
        };
    }
  };

  const addShadow = () => {
    const newShadow: Shadow = {
      id: `shadow-${Date.now()}`,
      offsetX: 2,
      offsetY: 4,
      blurRadius: 0,
      color: "#000000",
      enabled: true,
    };
    setShadows([...shadows, newShadow]);
  };

  const updateShadow = (id: string, updates: Partial<Shadow>) => {
    setShadows(
      shadows.map((shadow) => (shadow.id === id ? { ...shadow, ...updates } : shadow))
    );
  };

  const removeShadow = (id: string) => {
    setShadows(shadows.filter((shadow) => shadow.id !== id));
  };

  const generateCSS = () => {
    const shadowCSS = generateShadowCSS();
    return `.wordart {
  color: ${selectedStyle === "clear" ? "transparent" : textColor};
  text-shadow: ${shadowCSS};
}`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast.success("CSS copied to clipboard!");
  };

  const applyRainbow = () => {
    const newShadows = RAINBOW_COLORS.map((color, index) => ({
      id: `shadow-${Date.now()}-${index}`,
      offsetX: 2,
      offsetY: 2 + index * 2,
      blurRadius: 0,
      color,
      enabled: true,
    }));
    setShadows(newShadows);
  };

  const getBackgroundStyle = () => {
    const option = BACKGROUND_OPTIONS.find(opt => opt.id === selectedBackgroundOption);
    if (!option) return { backgroundColor: '#ffffff' };

    if (option.pattern) {
      return {
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, #e5e5e5 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      };
    }

    return { backgroundColor: option.color };
  };

  const mainStyle = getTextStyle(selectedStyle);

  return (
    <div className="space-y-6">
      {/* Preview Principal */}
      <div className="flex items-center justify-center p-8 min-h-[200px] rounded-lg border" style={getBackgroundStyle()}>
        <span className="text-8xl font-bold" style={mainStyle}>
          {text || "WordArt"}
        </span>
      </div>

      {/* Preview de Variantes */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {(["clear", "inverse", "default"] as const).map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`relative flex flex-col items-center justify-center p-4 rounded-lg border transition-all hover:border-foreground/40 flex-shrink-0 min-w-[140px] ${
              selectedStyle === style
                ? "border-foreground"
                : "border-border"
            }`}
            style={getBackgroundStyle()}
          >
            <div className="flex items-center justify-center h-16">
              <span className="text-3xl font-bold" style={getTextStyle(style)}>
                Aa
              </span>
            </div>
            <span className="mt-2 text-xs text-muted-foreground">{style}</span>
          </button>
        ))}
      </div>

      {/* Selectores de Color de Fondo */}
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          {BACKGROUND_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelectedBackgroundOption(option.id);
                setBackgroundColor(option.color);
              }}
              className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                selectedBackgroundOption === option.id
                  ? "border-foreground scale-110"
                  : "border-border"
              }`}
              style={
                option.pattern
                  ? {
                      backgroundColor: '#ffffff',
                      backgroundImage: 'radial-gradient(circle, #e5e5e5 1px, transparent 1px)',
                      backgroundSize: '8px 8px',
                    }
                  : { backgroundColor: option.color }
              }
              title={option.name}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-2">preview</span>
      </div>

      {/* Controles de Texto */}
      <div className="space-y-2">
        <Label htmlFor="wordart-text">Text</Label>
        <Input
          id="wordart-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
        />
      </div>

      {/* Selector de Color de Texto */}
      <div className="space-y-2">
        <Label htmlFor="text-color">Text Color</Label>
        <div className="flex gap-2">
          <div
            className="w-10 h-10 rounded border-2 border-border cursor-pointer"
            style={{ backgroundColor: textColor }}
          />
          <Input
            id="text-color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      {/* Controles de Sombras */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Shadows ({shadows.length})</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={applyRainbow} type="button">
              Rainbow
            </Button>
            <Button variant="outline" size="sm" onClick={addShadow} type="button">
              <Plus className="w-4 h-4 mr-2" />
              Add Shadow
            </Button>
          </div>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {shadows.map((shadow, index) => (
            <div
              key={shadow.id}
              className="p-4 border rounded-lg space-y-4 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Shadow {index + 1}</span>
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: shadow.color }}
                  />
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                {/* Offset X */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Offset X</Label>
                    <span className="text-xs text-muted-foreground">{shadow.offsetX}px</span>
                  </div>
                  <Slider
                    value={[shadow.offsetX]}
                    onValueChange={([value]) => updateShadow(shadow.id, { offsetX: value })}
                    min={-20}
                    max={20}
                    step={1}
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
                    min={-20}
                    max={20}
                    step={1}
                  />
                </div>

                {/* Blur */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Blur</Label>
                    <span className="text-xs text-muted-foreground">{shadow.blurRadius}px</span>
                  </div>
                  <Slider
                    value={[shadow.blurRadius]}
                    onValueChange={([value]) => updateShadow(shadow.id, { blurRadius: value })}
                    min={0}
                    max={20}
                    step={1}
                  />
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label className="text-sm">Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded border-2 border-border cursor-pointer"
                      style={{ backgroundColor: shadow.color }}
                    />
                    <Input
                      value={shadow.color}
                      onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                      placeholder="#000000"
                      className="flex-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Generated CSS</Label>
          <Button variant="outline" size="sm" onClick={copyCSS} type="button">
            <Copy className="w-4 h-4 mr-2" />
            Copy CSS
          </Button>
        </div>
        <pre className="text-sm bg-muted px-4 py-3 rounded-md overflow-x-auto font-mono">
          <code>{generateCSS()}</code>
        </pre>
      </div>
    </div>
  );
}
