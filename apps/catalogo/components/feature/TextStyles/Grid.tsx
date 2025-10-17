import { motion, AnimatePresence } from '@/lib/motion';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import type { TextStyle } from '@/types';

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

interface TextStylesGridProps {
  textStyles: TextStyle[];
  onSelectTextStyle: (textStyle: TextStyle) => void;
  searchQuery: string;
  isPreviewOpen: boolean;
}

export function TextStylesGrid({ textStyles, onSelectTextStyle, searchQuery, isPreviewOpen }: TextStylesGridProps) {
  // Inject CSS for all text styles with pseudo-elements on mount
  useEffect(() => {
    textStyles.forEach(textStyle => {
      if (textStyle.before || textStyle.after) {
        injectTextStyleCSS(textStyle);
      }
    });
  }, [textStyles]);

  const handleTextStyleClick = (textStyle: TextStyle) => {
    // Inject CSS for pseudo-elements if they exist
    if (textStyle.before || textStyle.after) {
      injectTextStyleCSS(textStyle);
    }
    onSelectTextStyle(textStyle);
  };

  if (textStyles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
        </motion.div>
        <h3 className="text-xl mb-2">No text styles found</h3>
        <p className="text-muted-foreground max-w-md">
          {searchQuery ? (
            <>Try adjusting your search for <span className="font-medium">"{searchQuery}"</span> or browse different categories.</>
          ) : (
            "Try adjusting your filters or browse different categories."
          )}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`grid ${isPreviewOpen ? "md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"} gap-2`}>
        <AnimatePresence>
          {textStyles.map((textStyle, index) => (
            <motion.button
              key={textStyle.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
                layout: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTextStyleClick(textStyle)}
              className="group relative aspect-4/3 rounded-md cursor-pointer bg-primary/3 border border-transparent hover:border-primary/20 transition-border duration-300 overflow-hidden "
            >
              {/* Text preview */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                  className={`text-center text-3xl select-none pointer-events-none ${
                    (textStyle.before || textStyle.after) ? `text-style-${textStyle.id.replace(/[^a-zA-Z0-9]/g, '-')}` : ''
                  }`}
                  style={(textStyle.before || textStyle.after) ? {} : textStyle.style}
                  {...(textStyle.usesDataText ? { 'data-text': textStyle.previewText } : {})}
                >
                  {textStyle.previewText}
                </div>
              </div>

            </motion.button>
          ))}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}