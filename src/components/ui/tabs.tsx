'use client';
import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { AnimatePresence, motion } from 'motion/react';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface TabsContextProps {
  defaultValue: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

const tabsStyles = cva('group/tabs flex gap-4 forced-color-adjust-none', {
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-row',
    },
  },
});

interface TabsProps extends ComponentProps<'div'> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
}

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  className,
  ...props
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue || '');

  const handleChange = useCallback(
    (newValue: string) => {
      if (onValueChange) onValueChange(newValue);
      if (!value) setActiveTab(newValue);
    },
    [onValueChange, value],
  );

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab: handleChange,
      orientation,
      defaultValue,
    }),
    [activeTab, handleChange, orientation, defaultValue],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        dir='ltr'
        data-orientation={orientation}
        className={cn(tabsStyles({ orientation }), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
};

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component');
  }
  return context;
};

const tabListStyles = cva('flex forced-color-adjust-none', {
  variants: {
    orientation: {
      horizontal: 'flex-row gap-2.5 border-border border-b',
      vertical: 'flex-col items-start gap-y-4 border-l min-w-40 h-fit',
    },
  },
});

const TabsList = ({ className, ...props }: ComponentProps<'div'>) => {
  const { orientation } = useTabs();

  return (
    <div
      role='tablist'
      aria-orientation={orientation}
      data-orientation={orientation}
      className={cn(tabListStyles({ orientation }), className)}
      {...props}
    />
  );
};

const tabStyles = cva(
  'relative flex cursor-pointer items-center font-medium text-sm outline-hidden transition py-4 px-2.5 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      isSelected: {
        false: 'text-foreground/50 hover:text-foreground',
        true: 'text-foreground ',
      },
      orientation: {
        horizontal: 'py-4 px-2.5 whitespace-nowrap justify-center',
        vertical: 'px-6 py-2 text-start',
      },
    },
  },
);

const spanOrientation = {
  horizontal: 'bottom-0 left-0 h-1 w-full',
  vertical: 'left-0 h-full w-1',
};
const TabsTrigger = ({
  asChild,
  value,
  children,
  className,
  lineClassName,
  ...props
}: ComponentProps<'button'> & { value: string; asChild?: boolean; lineClassName?: string }) => {
  const { activeTab, setActiveTab, orientation, defaultValue } = useTabs();

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type='button'
      role='tab'
      aria-selected={activeTab === value}
      data-state={activeTab === value ? 'active' : 'inactive'}
      data-orientation={orientation}
      onClick={() => setActiveTab(value)}
      className={cn(
        tabStyles({ isSelected: activeTab === value, orientation }),
        className,
        'hover:brightness-80',
      )}
      {...props}
    >
      {children}
      {activeTab === value && (
        <motion.span
          className={cn('bg-primary absolute', spanOrientation[orientation], lineClassName)}
          layoutId={`tabs-${defaultValue}`}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 40,
          }}
        />
      )}
    </Comp>
  );
};

const TabsContent = ({
  value,
  children,
  className,
  ...props
}: ComponentProps<'div'> & { value: string }) => {
  const { activeTab } = useTabs();
  return useMemo(
    () => (
      <div
        role='tabpanel'
        data-state={activeTab === value ? 'active' : 'inactive'}
        className={cn('w-full', className)}
        {...(activeTab !== value && { hidden: true })}
        {...props}
      >
        {activeTab == value && children}
      </div>
    ),
    [activeTab, value, children, className, props],
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent, useTabs };
