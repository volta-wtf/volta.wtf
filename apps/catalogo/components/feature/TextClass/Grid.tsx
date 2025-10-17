import React from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Search } from 'lucide-react';
import TextStyle from "./Card";
import { TextClass } from '@/types';

interface TextClassGridProps {
  textClasses: TextClass[];
  onSelectTextClass: (textClass: TextClass) => void;
  searchQuery: string;
  isPreviewOpen: boolean;
}

export default function TextClassGrid({
  textClasses: filteredTextClasses,
  onSelectTextClass,
  searchQuery,
  isPreviewOpen
}: TextClassGridProps) {
  const handleTextClassClick = (textClass: TextClass) => {
    onSelectTextClass(textClass);
  };

  if (filteredTextClasses.length === 0) {
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
        <h3 className="text-xl mb-2">No se encontraron efectos de texto</h3>
        <p className="text-muted-foreground max-w-md">
          {searchQuery ? (
            <>Intenta ajustar tu búsqueda para <span className="font-medium">"{searchQuery}"</span> o explora diferentes categorías.</>
          ) : (
            "Intenta ajustar tus filtros o explora diferentes categorías."
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
      <div className={`grid grid-cols-1  ${isPreviewOpen ? "lg:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"} gap-2`}>
        <AnimatePresence>
          {filteredTextClasses.map((textClass, index) => (
            <motion.button
              key={textClass.id}
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
              onClick={() => handleTextClassClick(textClass)}
              className="group relative cursor-pointer text-center"
            >
              <TextStyle
                id={textClass.id}
                //bg={textClass.background || 'transparent'}
                bg={'hsla(0 0% 0% / 5%)'}
                type={textClass.usesData ? 'with-data' : undefined}
              >
                {textClass.previewText}
              </TextStyle>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}