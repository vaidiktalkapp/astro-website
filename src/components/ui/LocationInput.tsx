import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export default function LocationInput({ value, onChange, name, className, ...props }: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (value && value.length > 2 && showSuggestions) {
        setIsSearching(true);
        try {
          const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5`);
          const data = await res.json();
          setSuggestions(data.features || []);
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value, showSuggestions]);

  const handleSelect = (displayName: string) => {
    // Create a synthetic event
    const event = {
      target: {
        name,
        value: displayName
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <input
        {...props}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className={className}
        autoComplete="off"
      />
      {isSearching && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#d4af37]" />
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ebdcc7] rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, idx) => {
            const { name: cityName, state, country } = suggestion.properties;
            const displayName = [cityName, state, country].filter(Boolean).join(', ');
            return (
              <div 
                key={idx}
                className="px-4 py-2.5 hover:bg-[#fffdf8] cursor-pointer border-b border-gray-100 last:border-0 text-[13px] text-gray-800 text-left"
                onClick={() => handleSelect(displayName)}
              >
                {displayName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
