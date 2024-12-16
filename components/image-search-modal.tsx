'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/components/navigation';

interface ImageSearchModalProps {
  onClose: () => void
}

export function ImageSearchModal({ onClose }: ImageSearchModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    router.push('/image-search');
    console.log(acceptedFiles);
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  })

  return (
    <div
      className="bg-[#303134] overflow-hidden shadow-2xl max-w-[584px] mx-auto rounded-lg"
      style={{ borderRadius: '1rem' }}
      tabIndex={0}
    >
      <div className="flex justify-between items-center p-4 border-b border-[#3c4043]">
        <h2 className="text-[15px] text-[#e8eaed] flex-grow text-center">Search any image with Google Lens</h2>
        <button 
          onClick={onClose}
          className="text-[#9aa0a6] hover:text-[#e8eaed] focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <div
          {...getRootProps()}
          style={{ borderRadius: '1rem' }}
          className={` bg-[#111111]
            border border-dashed border-[#5f6368] rounded-lg p-6
            flex flex-col items-center justify-center gap-3
            cursor-pointer transition-colors
            ${isDragActive ? 'border-[#8ab4f8] bg-[#8ab4f8]/10' : 'hover:border-[#8ab4f8]'}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-24 relative flex items-center justify-center">
              <Image
                src="/image-icon.svg"
                alt="Upload"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-[#9aa0a6] text-center text-sm">
              Drag an image here or <span className="text-[#8ab4f8]">upload a file</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 my-3">
          <div className="h-[1px] bg-[#5f6368] flex-1" />
          <span className="text-[#9aa0a6] text-sm">OR</span>
          <div className="h-[1px] bg-[#5f6368] flex-1" />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste image link"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 bg-[#202124] border border-[#5f6368] rounded-md px-3 py-2 text-[#e8eaed] text-sm placeholder:text-[#9aa0a6] focus:outline-none focus:border-[#8ab4f8]"
            style={{ borderRadius: '1rem' }}
          />
          <button 
            disabled={!imageUrl}
            className="bg-[#5f6368] text-[#8ab4f8] px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 hover:bg-[#7a7a7a] border border-[#5f6368]"
            style={{ borderRadius: '1rem' }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
};

