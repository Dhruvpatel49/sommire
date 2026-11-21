import React from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationControls = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xs border-t border-rose-500/10">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            'rounded-full w-10 h-10 transition-all duration-200 bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-md',
            currentSection === 0
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:from-rose-600 hover:to-rose-700'
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSectionSelect(index)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                currentSection === index
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 w-6'
                  : 'bg-rose-500/20 hover:bg-rose-500/40'
              )}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            'rounded-full w-10 h-10 transition-all duration-200 bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-md',
            currentSection === totalSections - 1
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:from-rose-600 hover:to-rose-700'
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
