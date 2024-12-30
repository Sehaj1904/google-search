'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/components/navigation';

interface ImageSearchModalProps {
  onClose: () => void;
  showLoading: boolean;
}

export function ImageSearchModal({ onClose, showLoading }: ImageSearchModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem('searchImageUrl', base64String);
      router.push('/image-search');
      onClose();
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      handleImageFile(acceptedFiles[0]);
      router.push('/image-search');
    }
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  }

  const handleSearch = () => {
    if (imageUrl) {
      localStorage.setItem('searchImageUrl', imageUrl);
      router.push('/image-search');
      onClose();
    }
  }

  return (
    <div
      className="image-search-modal bg-[#303134] overflow-hidden shadow-2xl max-w-[584px] mx-auto rounded-lg"
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

      <div className="p-4 border-[20px] border-[#303134] bg-[#202124]"  onChange={handleFileUpload}>
        {showLoading ? <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center gap-2 py-20">
            <Loader2 className="h-5 w-5 animate-spin text-[#8ab4f8]" />
            <span className="text-[#9aa0a6] text-sm">Uploading...</span>
          </div>
        </div> : 
        <>
        <div
          {...getRootProps()}
          style={{ borderRadius: '1rem' }}
          className={` 
            p-6 
            flex flex-col items-center justify-center gap-3
            cursor-pointer transition-colors
            ${isDragActive ? 'border-[#8ab4f8] border-dotted bg-[#8ab4f8]/10' : 'hover:border-[#8ab4f8]'}
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
              Drag an image here or <span className="text-[#8ab4f8] underline">upload a file</span>
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
            className="flex-1 bg-[#303134] border border-[#5f6368] rounded-lg px-3 py-2 text-[#e8eaed] text-sm placeholder:text-[#9aa0a6] focus:outline-none focus:border-[#8ab4f8]"
            style={{ borderRadius: '3rem' }}
          />
          <button 
            onClick={handleSearch}
            className="bg-[#303134] text-[#8ab4f8] px-8 py-2 rounded-lg text-sm font-medium hover:bg-[#7a7a7a] border border-[#5f6368]"
            style={{ borderRadius: '3rem' }}
          >
            Search
          </button>
        </div>
      </>}
      </div>
    </div>
  )
};

