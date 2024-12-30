'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageSearchModal } from './image-search-modal';
import { VoiceSearchModal } from './voice-search-modal'
import { Button } from '@/components/ui/button'

export function SearchSection() {
  const [showImageSearch, setShowImageSearch] = useState(false)
  const [showVoiceSearch, setShowVoiceSearch] = useState(false)

  return (
    <main className="flex flex-col items-center justify-center flex-grow h-[calc(100vh-160px)]">
      <div className="w-full max-w-[272px] mb-8">
        <Image
          src="/google-logo.svg"
          alt="Google"
          width={272}
          height={92}
          priority
          className="w-full"
        />
      </div>


      <div className="flex space-x-3 mt-8">
        <Button variant="secondary" className="bg-[#303134] hover:bg-[#3c4043] text-gray-300 border-0">
          Google Search
        </Button>
        <Button variant="secondary" className="bg-[#303134] hover:bg-[#3c4043] text-gray-300 border-0">
          I&apos;m Feeling Lucky
        </Button>
      </div>

      <div className="mt-8 text-sm">
        <span className="text-gray-400">Google offered in: </span>
        {[
          "हिन्दी",
          "বাংলা",
          "తెలుగు",
          "मराठी",
          "தமிழ்",
          "ગુજરાતી",
          "ಕನ್ನಡ",
          "മലയാളം",
          "ਪੰਜਾਬੀ"
        ].map((language, i) => (
          <Link 
            key={i} 
            href="#" 
            className="text-blue-400 hover:underline ml-2"
          >
            {language}
          </Link>
        ))}
      </div>

      {showImageSearch && (
        <ImageSearchModal onClose={() => setShowImageSearch(false)} />
      )}

      {showVoiceSearch && (
        <VoiceSearchModal onClose={() => setShowVoiceSearch(false)} />
      )}
    </main>
  )
}

