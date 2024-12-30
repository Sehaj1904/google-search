'use client'

import { useState, useRef } from 'react';
import { Camera, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SearchDropdown } from './search-dropdown';
import { ImageSearchModal } from './image-search-modal';
import { sampleKeywords } from './sampleKeywords';
import Image from 'next/image';

interface SearchBarProps {
  onImageSearch: () => void,
  onVoiceSearch: () => void,
}

export function SearchBar({ onVoiceSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredKeywords = sampleKeywords.filter(keyword =>
    keyword.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-[584px] relative">
      <div className="relative">
        <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
        <Input 
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="w-full bg-transparent border border-gray-700 rounded-full py-3 px-12 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-[#303134] focus:bg-[#303134] focus:border-[#303134]"
          placeholder="Search Google or type a URL"
          title="Search Input"
        />
        <div className="absolute right-4 top-3 flex items-center space-x-3">
          <button onClick={onVoiceSearch} className="focus:outline-none" title="Voice Search">
            <Image 
              src="/mic.svg"
              alt="Voice Search"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
          <button onClick={() => setShowImageSearch(true)} className="focus:outline-none" title="Image Search">
            <Camera className="h-5 w-5 text-blue-500 cursor-pointer" />
          </button>
        </div>
      </div>
      {showDropdown && query && (
        <SearchDropdown 
          searches={filteredKeywords.map(text => ({ type: 'trending', text }))}
          onClose={() => setShowDropdown(false)}
        />
      )}
      {showImageSearch && (
        <ImageSearchModal onClose={() => setShowImageSearch(false)} />
      )}
    </div>
  )
}

