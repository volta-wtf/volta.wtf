"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

import {
  AppLayout,
  AppHeader,
  AppContainer,
  AppSidebar,
  AppMain
} from '@/components/layout/AppLayout';

import { MainNavigation } from '@/components/layout/MainNavigation';
import { PreviewToggler } from '@/components/layout/PreviewToggler';
import { SearchInput } from '@/components/layout/SearchInput';
import { CategoryFilter } from '@/components/layout/CategoryFilter';

import { GradientGrid } from '@/components/feature/Gradients/Grid';
import { GradientPanel } from '@/components/feature/Gradients/Panel';
import { TextStylesGrid } from '@/components/feature/TextStyles/Grid';
import { TextStylePanel } from '@/components/feature/TextStyles/Panel';
import TextClassGrid from '@/components/feature/TextClass/Grid';
import { TextClassPanel } from '@/components/feature/TextClass/Panel';
import { FrameStylesGrid } from '@/components/feature/FrameStyles/Grid';
import { FrameStylePanel } from '@/components/feature/FrameStyles/Panel';

// Types
import { Gradient, TextStyle, FrameStyle, TextClass, Section } from '@/types';

// Data
import {
  gradients,
  gradientCategories,
  textStyles,
  textStyleCategories,
  frameStyles,
  frameStyleCategories,
  textClasses,
  textClassesCategories
} from '@/data';

// CSS Injection utilities
// TODO: Arreglar path de import
import {
  injectMultipleGradients,
  injectMultipleTextStyles,
  injectMultipleFrameStyles
} from '@/lib/cssInjection';

import "@/styles/index.css";

export default function GalleryPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<Section>('text-classes');

  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
  const [selectedTextStyle, setSelectedTextStyle] = useState<TextStyle | null>(null);
  const [selectedTextClass, setSelectedTextClass] = useState<TextClass | null>(null);
  const [selectedFrameStyle, setSelectedFrameStyle] = useState<FrameStyle | null>(null);

  // Handlers that auto-close other panels
  const handleSelectGradient = (gradient: Gradient | null) => {
    setSelectedGradient(gradient);
    setSelectedTextStyle(null);
    setSelectedTextClass(null);
    setSelectedFrameStyle(null);
    setIsPreviewOpen(true);
  };
  const handleSelectTextStyle = (textStyle: TextStyle | null) => {
    setSelectedTextStyle(textStyle);
    setSelectedGradient(null);
    setSelectedTextClass(null);
    setSelectedFrameStyle(null);
    setIsPreviewOpen(true);
  };
  const handleSelectTextClass = (textClass: TextClass | null) => {
    setSelectedTextClass(textClass);
    setSelectedGradient(null);
    setSelectedTextStyle(null);
    setSelectedFrameStyle(null);
    setIsPreviewOpen(true);
  };
  const handleSelectFrameStyle = (frameStyle: FrameStyle | null) => {
    setSelectedFrameStyle(frameStyle);
    setSelectedGradient(null);
    setSelectedTextStyle(null);
    setSelectedTextClass(null);
    setIsPreviewOpen(true);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  // Modified and custom items state
  const [modifiedGradients, setModifiedGradients] = useState<Gradient[]>([]);
  const [modifiedTextStyles, setModifiedTextStyles] = useState<TextStyle[]>([]);
  const [modifiedFrameStyles, setModifiedFrameStyles] = useState<FrameStyle[]>([]);
  const [customGradients, setCustomGradients] = useState<Gradient[]>([]);
  const [customTextStyles, setCustomTextStyles] = useState<TextStyle[]>([]);
  const [customFrameStyles, setCustomFrameStyles] = useState<FrameStyle[]>([]);

  // const { user, logout, isFavorite } = useAuth()

  // Inyección inicial de CSS (una sola vez al cargar)
  useEffect(() => {
    // Inyectar CSS para todos los datos originales
    injectMultipleGradients(gradients);
    injectMultipleTextStyles(textStyles);
    injectMultipleFrameStyles(frameStyles);
    // textClasses NO necesitan inyección (archivos CSS estáticos)
  }, []); // Solo una vez al montar

  // Inyectar CSS cuando se crean/modifican estilos
  useEffect(() => {
    injectMultipleGradients([...customGradients, ...modifiedGradients]);
    injectMultipleTextStyles([...customTextStyles, ...modifiedTextStyles]);
    injectMultipleFrameStyles([...customFrameStyles, ...modifiedFrameStyles]);
  }, [customGradients, modifiedGradients, customTextStyles, modifiedTextStyles, customFrameStyles, modifiedFrameStyles]);

  // Get current data and categories based on active section
  const getCurrentData = () => {
    switch (activeSection) {
      case 'gradients':
        return {
          data: [...gradients, ...modifiedGradients, ...customGradients],
          categories: gradientCategories
        };
      case 'text-styles':
        return {
          data: [...textStyles, ...modifiedTextStyles, ...customTextStyles],
          categories: textStyleCategories
        };
      case 'text-classes':
        return {
          data: textClasses,
          categories: textClassesCategories
        };
      case 'frame-styles':
        return {
          data: [...frameStyles, ...modifiedFrameStyles, ...customFrameStyles],
          categories: frameStyleCategories
        };
      default:
        return { data: gradients, categories: gradientCategories };
    }
  };

  const { data: currentData, categories: currentCategories } = getCurrentData();

  // Get all unique tags from current data
  const currentTags = useMemo(() => {
    const allTags = new Set<string>();
    allTags.add('All');

    currentData.forEach((item: any) => {
      if (item.tags) {
        item.tags.forEach((tag: string) => allTags.add(tag));
      }
    });

    return Array.from(allTags);
  }, [currentData]);

  const filteredData = useMemo(() => {
    return currentData.filter((item: any) => {
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.usage && item.usage.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      const matchesTag = selectedTag === 'All' || (item.tags && item.tags.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [currentData, searchQuery, selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag('All');
  };

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    clearFilters();
  };

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  // Duplicate handlers (now creates custom items)
  const handleDuplicateGradient = (gradient: Gradient) => {
    const newGradient: Gradient = {
      ...gradient,
      id: `custom-${Date.now()}`,
      name: `${gradient.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomGradients(prev => [...prev, newGradient]);
    handleSelectGradient(newGradient);
  };

  const handleDuplicateTextStyle = (textStyle: TextStyle) => {
    const newTextStyle: TextStyle = {
      ...textStyle,
      id: `custom-${Date.now()}`,
      name: `${textStyle.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomTextStyles(prev => [...prev, newTextStyle]);
    handleSelectTextStyle(newTextStyle);
  };

  const handleDuplicateFrameStyle = (frameStyle: FrameStyle) => {
    const newFrameStyle: FrameStyle = {
      ...frameStyle,
      id: `custom-${Date.now()}`,
      name: `${frameStyle.name} (Copy)`,
      category: 'Custom',
      isCustom: true
    };
    setCustomFrameStyles(prev => [...prev, newFrameStyle]);
    handleSelectFrameStyle(newFrameStyle);
  };

  // Update handlers (now handle all items)
  const handleUpdateGradient = (updatedGradient: Gradient) => {
    if (updatedGradient.isCustom) {
      // Update custom items
      setCustomGradients(prev =>
        prev.map(g => g.id === updatedGradient.id ? updatedGradient : g)
      );
    } else {
      // Check if this is a built-in item being modified
      const isBuiltIn = gradients.find(g => g.id === updatedGradient.id);
      if (isBuiltIn) {
        // Mark as modified and add to modified items
        const modifiedGradient: Gradient = {
          ...updatedGradient,
          isModified: true,
          category: updatedGradient.category === 'Modified' ? updatedGradient.category : updatedGradient.category
        };

        setModifiedGradients(prev => {
          const existing = prev.find(g => g.id === updatedGradient.id);
          if (existing) {
            return prev.map(g => g.id === updatedGradient.id ? modifiedGradient : g);
          } else {
            return [...prev, modifiedGradient];
          }
        });
      } else {
        // Update modified items
        setModifiedGradients(prev =>
          prev.map(g => g.id === updatedGradient.id ? updatedGradient : g)
        );
      }
    }
            handleSelectGradient(updatedGradient);
  };

  const handleUpdateTextStyle = (updatedTextStyle: TextStyle) => {
    if (updatedTextStyle.isCustom) {
      setCustomTextStyles(prev =>
        prev.map(ts => ts.id === updatedTextStyle.id ? updatedTextStyle : ts)
      );
    } else {
      const isBuiltIn = textStyles.find(ts => ts.id === updatedTextStyle.id);
      if (isBuiltIn) {
        const modifiedTextStyle: TextStyle = {
          ...updatedTextStyle,
          isModified: true
        };

        setModifiedTextStyles(prev => {
          const existing = prev.find(ts => ts.id === updatedTextStyle.id);
          if (existing) {
            return prev.map(ts => ts.id === updatedTextStyle.id ? modifiedTextStyle : ts);
          } else {
            return [...prev, modifiedTextStyle];
          }
        });
      } else {
        setModifiedTextStyles(prev =>
          prev.map(ts => ts.id === updatedTextStyle.id ? updatedTextStyle : ts)
        );
      }
    }
            handleSelectTextStyle(updatedTextStyle);
  };

  const handleUpdateFrameStyle = (updatedFrameStyle: FrameStyle) => {
    if (updatedFrameStyle.isCustom) {
      setCustomFrameStyles(prev =>
        prev.map(fs => fs.id === updatedFrameStyle.id ? updatedFrameStyle : fs)
      );
    } else {
      const isBuiltIn = frameStyles.find(fs => fs.id === updatedFrameStyle.id);
      if (isBuiltIn) {
        const modifiedFrameStyle: FrameStyle = {
          ...updatedFrameStyle,
          isModified: true
        };

        setModifiedFrameStyles(prev => {
          const existing = prev.find(fs => fs.id === updatedFrameStyle.id);
          if (existing) {
            return prev.map(fs => fs.id === updatedFrameStyle.id ? modifiedFrameStyle : fs);
          } else {
            return [...prev, modifiedFrameStyle];
          }
        });
      } else {
        setModifiedFrameStyles(prev =>
          prev.map(fs => fs.id === updatedFrameStyle.id ? updatedFrameStyle : fs)
        );
      }
    }
    handleSelectFrameStyle(updatedFrameStyle);
  };

  const isLightboxOpen = selectedGradient || selectedTextStyle || selectedTextClass || selectedFrameStyle;

  return (
    <AppLayout>

      <AppHeader isPreviewOpen={isPreviewOpen}>
        <SearchInput
          data-slot="content"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isPreviewOpen={isPreviewOpen}
          placeholder="Search..."
        />
        <PreviewToggler
          data-slot="actions"
          isPreviewOpen={isPreviewOpen}
          togglePreview={togglePreview}
        />
      </AppHeader>

      <AppContainer>

        <AppSidebar>
          <MainNavigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="mt-8">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={currentCategories}
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              tags={currentTags}
              onClearFilters={clearFilters}
              resultsCount={filteredData.length}
              totalCount={currentData.length}
            />
          </div>
        </AppSidebar>

        <AppMain isPreviewOpen={isPreviewOpen}>
          <section data-slot="content" className="w-full">
            {activeSection === 'gradients' && (
              <GradientGrid
                key="gradients-grid"
                gradients={filteredData as Gradient[]}
                onSelectGradient={handleSelectGradient}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
            {activeSection === 'text-styles' && (
              <TextStylesGrid
                key="text-styles-grid"
                textStyles={filteredData as TextStyle[]}
                onSelectTextStyle={handleSelectTextStyle}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
            {activeSection === 'text-classes' && (
              <TextClassGrid
                key="text-classes-grid"
                textClasses={filteredData as TextClass[]}
                onSelectTextClass={handleSelectTextClass}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
            {activeSection === 'frame-styles' && (
              <FrameStylesGrid
                key="frame-styles-grid"
                frameStyles={filteredData as FrameStyle[]}
                onSelectFrameStyle={handleSelectFrameStyle}
                isPreviewOpen={isPreviewOpen}
                searchQuery={searchQuery}
              />
            )}
          </section>
          <section data-slot="complement" className="w-full">
            {selectedGradient && (
              <GradientPanel
                key="gradient-lightbox"
                gradient={selectedGradient}
                onClose={() => handleSelectGradient(null)}
                onDuplicate={handleDuplicateGradient}
                onUpdate={handleUpdateGradient}
              />
            )}
            {selectedTextStyle && (
              <TextStylePanel
                key="text-style-lightbox"
                textStyle={selectedTextStyle}
                onClose={() => handleSelectTextStyle(null)}
                onDuplicate={handleDuplicateTextStyle}
                onUpdate={handleUpdateTextStyle}
              />
            )}
            {selectedTextClass && (
              <TextClassPanel
                key="text-class-lightbox"
                textClass={selectedTextClass}
                onClose={() => handleSelectTextClass(null)}
              />
            )}
            {selectedFrameStyle && (
              <FrameStylePanel
                key="frame-style-lightbox"
                frameStyle={selectedFrameStyle}
                onClose={() => handleSelectFrameStyle(null)}
                onDuplicate={handleDuplicateFrameStyle}
                onUpdate={handleUpdateFrameStyle}
              />
            )}
          </section>
        </AppMain>

      </AppContainer>

      <Toaster />
    </AppLayout>
  );
}

// Re-export types for backward compatibility
export type { Gradient, TextStyle, FrameStyle, Section } from '@/types';