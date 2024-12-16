import Link from 'next/link'
import { AppWindow } from 'lucide-react'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { ArrowUpFromLine, Menu } from 'lucide-react'

export function Header() {
  const [isImageSearch, setIsImageSearch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      setIsImageSearch(currentPath === '/image-search');
    }
  }, []);

  return (
    <header className="flex justify-between items-center p-4 sm:px-6">
      {isImageSearch ? (
        <div className="flex items-center justify-between px-6 py-2 border-b border-[#3c4043] w-full">
          <div className="flex items-center gap-4 flex-grow">
            <Link href="/">
              <Image
                src="/google-colored.svg"
                alt="Google"
                width={92}
                height={30}
                className="w-[92px]"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-[#e8eaed] bg-[#303134] rounded-full hover:bg-[#3c4043]">
              <ArrowUpFromLine className="w-4 h-4" />
              Upload
            </button>
            <button className="p-2 text-[#e8eaed] hover:bg-[#3c4043] rounded-full">
              <Menu className="w-6 h-6" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#8ab4f8] text-[#202124] flex items-center justify-center font-medium">
              A
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-[#e8eaed] text-sm hover:text-white" title="About">About</Link>
            <Link href="#" className="text-[#e8eaed] text-sm hover:text-white" title="Store">Store</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-[#e8eaed] text-sm hover:text-white" title="Gmail">Gmail</Link>
            <Link href="#" className="text-[#e8eaed] text-sm hover:text-white" title="Images">Images</Link>
            <button className="p-2 hover:bg-[#3c4043] rounded-full" title="App Window">
              <AppWindow className="h-5 w-5 text-[#e8eaed]" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#8ab4f8] text-[#202124] flex items-center justify-center font-medium" title="User Profile">
              A
            </button>
          </div>
        </>
      )}
    </header>
  )
}

