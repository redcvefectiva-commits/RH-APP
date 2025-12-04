
import React, { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select...",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
        onClick={handleToggle}
      >
        <span className="block truncate">
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder}
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => handleSelect(option.value)}
            >
              <span className={`font-normal block truncate ${selectedValues.includes(option.value) ? 'font-semibold' : ''}`}>
                {option.label}
              </span>
              {selectedValues.includes(option.value) && (
                 <span className="text-primary absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                 </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
