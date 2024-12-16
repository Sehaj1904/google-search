'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, User } from 'lucide-react';
import Image from 'next/image';

interface SearchItem {
  type: 'trending' | 'person' | 'media'
  text: string
  description?: string
}

interface SearchDropdownProps {
  searches: SearchItem[]
  onClose: () => void
}

export function SearchDropdown({ searches, onClose }: SearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-[#303134] rounded-lg shadow-lg overflow-hidden z-50"
      title="Search Dropdown"
      style={{ borderBottomRightRadius: '1rem', borderBottomLeftRadius: '1rem' }}
    >
      <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm text-[#9aa0a6] mb-2">Trending searches</h3>
          <div className="space-y-1">
            {searches.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 hover:bg-[#3c4043] rounded-lg cursor-pointer group"
                title={item.text}
              >
                {item.type === 'trending' && (
                  <TrendingUp className="h-4 w-4 text-[#9aa0a6] group-hover:text-[#e8eaed]" />
                )}
                {item.type === 'person' && (
                  <User className="h-4 w-4 text-[#9aa0a6] group-hover:text-[#e8eaed]" />
                )}
                {item.type === 'media' && (
                  <div className="w-8 h-8 relative rounded overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt={item.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="text-[#e8eaed] text-sm">{item.text}</div>
                  {item.description && (
                    <div className="text-[#9aa0a6] text-xs">{item.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

