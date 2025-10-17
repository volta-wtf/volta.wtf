import { motion, AnimatePresence } from '@/lib/motion';
import { Search } from 'lucide-react';
import type { Gradient } from '@/app/gallery/page';

interface GradientGridProps {
  gradients: Gradient[];
  onSelectGradient: (gradient: Gradient) => void;
  isPreviewOpen: boolean;
  searchQuery: string;
}

export function GradientGrid({ gradients, onSelectGradient, isPreviewOpen, searchQuery }: GradientGridProps) {
  if (gradients.length === 0) {
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
        <h3 className="text-xl mb-2">No gradients found</h3>
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
      <div className={`grid ${isPreviewOpen ? "grid-cols-3" : "grid-cols-8"} gap-2`}>
        <AnimatePresence>
          {gradients.map((gradient, index) => (
            <motion.button
              key={gradient.id}
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
              onClick={() => onSelectGradient(gradient)}
              className="group relative bg-origin-border! bg-cover! aspect-square rounded-md cursor-pointer hover:border hover:border-primary/40 transition-border duration-300 overflow-hidden"
              style={{background: gradient.gradient}}
            >
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}