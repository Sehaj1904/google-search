'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ImageSearchModal } from '@/components/image-search-modal';
import { SearchDropdown } from '@/components/search-dropdown';
import { useRouter } from 'next/navigation';

type SearchItem = {
  type: 'trending' | 'person' | 'media',
  text: string,
  description?: string,
}

export default function Home() {
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [activeMic, setActiveMic] = useState(false);

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
  ];

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem('searchImageUrl', base64String);
      router.push('/image-search');
    };
    reader.readAsDataURL(file);
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      setMicPermission('granted')
    } catch (err) {
      setMicPermission('denied')
      console.error('Microphone permission denied:', err)
    }
  }

  useEffect(()=>{
    if(isListening){
setTimeout(()=>{
  setActiveMic(true);
}, 1000);
    }
  },[isListening]);


  useEffect(() => {
    if (isListening) {
      requestMicrophonePermission()
    }
  }, [isListening])

  useEffect(() => {
    const handleDragEnter = () => {
      setShowImageSearch(true)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (showImageSearch && !(event.target as Element).closest('.image-search-modal')) {
        setShowImageSearch(false)
      }
    }

    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showImageSearch])

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
                setShowLoading(true);
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                  const file = files[0];
                  console.log('Dropped file:', file);
                  handleImageFile(file);
                }
              }}
            >
              <div className="relative">
                {showImageSearch ? (
                  <div className="fixed inset-x-0 z-50 pb-4 px-4">
                    <ImageSearchModal showLoading={showLoading} onClose={() => setShowImageSearch(false)} />
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
                <Image 
              src="/mic.svg"
              alt="Voice Search"
              width={20}
              height={20}
              className="cursor-pointer"
            />
                </button>
                <button className="focus:outline-none" onClick={() => setShowImageSearch(true)}>
                <Image 
              src="/camera.svg"
              alt="Voice Search"
              width={20}
              height={20}
              className="cursor-pointer"
            />
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
        <div onClick={() => setIsListening(false)} className="flex items-center justify-center h-screen w-full bg-[#202124] rounded-full relative">
          <button 
            onClick={() => setIsListening(false)}
            className="absolute top-4 right-4 text-[#9aa0a6] hover:text-[#e8eaed] focus:outline-none"
          >
            <X className="h-4 w-4 text-d-grey" />
          </button>
          <span className="text-[#9aa0a6] text-3xl max-w-[500px] animate-text-up mr-28">
            {(micPermission === 'granted' || micPermission === 'pending') && 'Listening...'}
            {micPermission === 'denied' && (
              <span>Voice Search has been turned off.
                <a 
                  href="https://support.google.com/chrome/answer/2693767" 
                  target="_blank" 
                  className="text-[#8ab4f8] text-sm underline ml-2"
                >
                  Details
                </a>
              </span>
            )}
          </span>
          <div className="relative">
            {micPermission === 'granted' && activeMic && <div className="absolute inset-0 animate-pulse-ring rounded-full bg-[#9aa0a6]/20" />}
            {micPermission === 'granted' ? 
            activeMic ? <Image 
              src="/active-mic.svg"
              alt="Voice Search"
              width={200}
              height={200}
              className="relative cursor-pointer animate-scale-up"
            />: <Image 
            src="/active-mic-init.svg"
            alt="Voice Search"
            width={200}
            height={200}
            className="relative cursor-pointer"
          /> : <Image 
              src="/inactive-mic.png"
              alt="Voice Search"
              width={200}
              height={200}
              className="relative cursor-pointer"
            />}
          </div>
        </div>
      )}
    </div>
  )
}

