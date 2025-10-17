import { motion, AnimatePresence } from '@/lib/motion';
import { Search } from 'lucide-react';

export interface FrameStyle {
  id: string;
  name: string;
  description: string;
  style: React.CSSProperties;
  category: string;
  tags: string[];
  cssClass: string;
  material: string;
  isCustom?: boolean;
}

interface FrameStylesGridProps {
  frameStyles: FrameStyle[];
  onSelectFrameStyle: (frameStyle: FrameStyle) => void;
  searchQuery: string;
  isPreviewOpen: boolean;
}

export function FrameStylesGrid({ frameStyles, onSelectFrameStyle, searchQuery, isPreviewOpen }: FrameStylesGridProps) {
  if (frameStyles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center"
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
        <h3 className="text-xl mb-2">No frame styles found</h3>
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
      <div className={`grid ${isPreviewOpen ? "grid-cols-2" : "grid-cols-5"} gap-2`}>
        <AnimatePresence>
          {frameStyles.map((frameStyle, index) => (
            <motion.button
              key={frameStyle.id}
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
              onClick={() => onSelectFrameStyle(frameStyle)}
              className="group relative aspect-square rounded-md cursor-pointer bg-primary/3 border border-transparent hover:border hover:border-primary/20 transition-border duration-300 overflow-hidden"
            >
              {/* Frame preview */}
              <div
                className="absolute inset-4 rounded-lg"
                style={frameStyle.style}
              >
              </div>


            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}