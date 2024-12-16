'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Mic, Search } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ImageSearchModal } from '@/components/image-search-modal';
import { SearchDropdown } from '@/components/search-dropdown';

type SearchItem = {
  type: 'trending' | 'person' | 'media',
  text: string,
  description?: string,
}

export default function Home() {
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const trendingSearches: SearchItem[] = [
    { type: 'trending', text: 'x empire episode youtube code' },
    { type: 'person', text: 'Farooq Abdullah', description: 'Former Minister of New and Renewable Energy Govt of India' },
    { type: 'trending', text: 'bengaluru man acid attack' },
    { type: 'trending', text: 'china stimulus package' },
    { type: 'media', text: 'Emily in Paris', description: 'Comedy-drama series' },
    { type: 'trending', text: 'aurora borealis northern lights' },
    { type: 'trending', text: 'videos' },
    { type: 'person', text: 'Gurpatwant Singh Pannun', description: 'Advocate' },
    { type: 'trending', text: 'air india flight trichy airport' },
    { type: 'trending', text: 'iran cyber attack israel' },
  ]

  useEffect(() => {
    const handleDragEnter = () => {
      setShowImageSearch(true)
    }

    window.addEventListener('dragenter', handleDragEnter)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#202124]" onDragStart={() => setShowImageSearch(true)}>
      {!isListening ? (
        <>
          <Header />
          <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 max-w-[800px] mx-auto w-full">
            <div className="w-full max-w-[272px] mb-4">
              <Image
                src="https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
                alt="Google"
                width={272}
                height={92}
                priority
                className="w-full"
              />
            </div>
            <div
              style={{
                borderTopRightRadius: '1rem',
                borderTopLeftRadius: '1rem',
                backgroundColor: showDropdown ? '#303134' : '#202124',
              }}
              className="w-full max-w-[584px] relative mb-8"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const files = e.dataTransfer.files
                if (files.length > 0) {
                  const file = files[0]
                  console.log('Dropped file:', file)
                }
              }}
            >
              <div className="relative">
                {showImageSearch ? (
                  <div className="fixed inset-x-0 z-50 pb-4 px-4">
                    <ImageSearchModal onClose={() => setShowImageSearch(false)} />
                  </div>
                ) : (
                  <Search className="absolute left-4 top-3 h-5 w-5 text-[#9aa0a6]" />
                )}
                <input
                  type="text"
                  className="w-full bg-[#202124] border rounded-full py-3 px-12 focus:outline-none text-[#e8eaed] text-sm sm:text-base"
                  placeholder="Search Google or type a URL"
                  onFocus={() => setShowDropdown(true)}
                  style={{
                    transition: 'background-color 0.3s ease',
                    backgroundColor: showDropdown ? '#303134' : '#202124',
                    borderColor: showDropdown ? '#303134' : '#5f6368',
                  }}
                />
              </div>
              <div className="absolute right-4 top-3 flex items-center gap-3">
                <button className="focus:outline-none" onClick={() => setIsListening(true)}>
                  <Mic className="h-5 w-5 text-[#8ab4f8]" />
                </button>
                <button className="focus:outline-none" onClick={() => setShowImageSearch(true)}>
                  <Camera className="h-5 w-5 text-[#8ab4f8]" />
                </button>
              </div>
              {showDropdown && (
                <SearchDropdown
                  searches={trendingSearches}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </div>
            <div className="flex gap-3 mb-8">
              <button className="bg-[#303134] text-[#e8eaed] px-4 py-2 rounded-md text-sm hover:bg-[#3c4043] border border-[#303134] hover:border-[#5f6368]" title="Search">
                Google Search
              </button>
              <button className="bg-[#303134] text-[#e8eaed] px-4 py-2 rounded-md text-sm hover:bg-[#3c4043] border border-[#303134] hover:border-[#5f6368]">
                I&apos;m Feeling Lucky
              </button>
            </div>
            <div className="text-sm text-center">
              <span className="text-[#9aa0a6]">Google offered in: </span>
              {[
                'हिन्दी',
                'বাংলা',
                'తెలుగు',
                'मराठी',
                'தமிழ்',
                'ગુજરાતી',
                'ಕನ್ನಡ',
                'മലയാളം',
                'ਪੰਜਾਬੀ',
              ].map((language, i) => (
                <Link key={i} href="#" className="text-[#8ab4f8] hover:underline ml-2">
                  {language}
                </Link>
              ))}
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen w-full bg-[#202124] rounded-full">
          <span className="text-[#9aa0a6]" style={{ fontSize: '0.875rem', fontWeight: '400', marginLeft: '-10px', marginTop: '-10px' }}>
            Listening...
          </span>
          <div className="ml-10 bg-white rounded-full p-2">
            <Mic className="h-8 w-8 text-red-500" />
          </div>
        </div>
      )}
    </div>
  )
}

