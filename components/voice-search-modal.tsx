'use client';

import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

interface VoiceSearchModalProps {
  onClose: () => void
}

export function VoiceSearchModal({ onClose }: VoiceSearchModalProps) {
  const [isListening, setIsListening] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsListening(false)
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 bg-[#202124] flex flex-col items-center justify-center z-50"
      onClick={onClose}
      title="Voice Search Modal"
    >
      <div className="text-4xl text-gray-400 mb-8">
        {isListening ? 'Listening...' : 'Speak now'}
      </div>
      <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center
        ${isListening ? 'animate-pulse' : ''}`}
        title="Microphone"
      >
        <Mic className="h-8 w-8 text-red-500" />
      </div>
    </div>
  )
}

