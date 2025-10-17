import { motion } from '@/lib/motion';
import { Palette, Type, Frame, FileText } from 'lucide-react';
import { Section } from '../../../types';

interface MainNavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const categoryItems = [
  {
    id: 'text-classes' as Section,
    label: 'Text Styles',
    icon: Type,
    description: 'WordArt and typography effects'
  },
  //{
  //  id: 'text-styles' as Section,
  //  label: 'Text Legacy',
  //  icon: Type,
  //  description: 'WordArt and typography effects'
  //},
  {
    id: 'frame-styles' as Section,
    label: 'Frame Styles',
    icon: Frame,
    description: 'Material-based frame effects'
  },
  {
    id: 'gradients' as Section,
    label: 'Gradients',
    icon: Palette,
    description: 'Beautiful color gradients'
  },
];

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Installation', href: '/' },
  { label: 'About', href: '/about' },
];

export function MainNavigation({ activeSection, onSectionChange }: MainNavigationProps) {
  return (
    <nav>
      <div className="-ml-3">
        {categoryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-border/50 rounded-sm"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}

              <div className="relative flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <ul className="flex flex-col gap-2 mt-6">
        {navigationItems.map((link) => (
          <li key={link.label} className="text-sm font-medium text-muted-foreground">
            <a className="hover:text-foreground" href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}