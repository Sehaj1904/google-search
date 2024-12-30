'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, Type, Languages, Star } from 'lucide-react';
import { Header } from '@/components/header';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Product {
  id: string,
  title: string,
  price: string,
  image: string,
  additionalImages?: string[],
  retailer: {
    name: string,
    logo: string,
  },
  rating?: {
    value: number,
    count: number,
  },
  inStock: boolean,
}

type Tab = 'search' | 'text' | 'translate';

export default function ImageSearchPage() {
  const [searchImage, setSearchImage] = useState<string | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<Tab>('search');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });


  useEffect(() => {
    const storedImageUrl = localStorage.getItem('searchImageUrl');
    if (storedImageUrl) {
      setSearchImage(storedImageUrl);
      localStorage.removeItem('searchImageUrl');
    }else{
    }
  }, []);

  
  const products: Product[] = [
    {
      id: '1',
      title: 'Uniqlo Fleece Full-Zip Jacket',
      price: '₹2,490.00*',
      image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439138/item/goods_32_439138.jpg',
      additionalImages: [
        'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439138/item/goods_32_439138.jpg',
        'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439138/item/goods_32_439138.jpg',
      ],
      retailer: {
        name: 'Uniqlo',
        logo: 'https://asset.brandfetch.io/idD7RfhCFS/id3KSPzOI3.png',
      },
      inStock: true,
    },
    {
      id: '2',
      title: 'UNIQLO US Fleece Full-Zip Jacket',
      price: '₹4,960.00*',
      image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439138/item/goods_32_439138.jpg',
      retailer: {
        name: 'UNIQLO US',
        logo: 'https://asset.brandfetch.io/idD7RfhCFS/id3KSPzOI3.png',
      },
      inStock: true,
    },
    {
      id: '3',
      title: 'THERMOLITE Relaxed Fit Teddy jacket',
      price: '₹2,249.00*',
      image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439138/item/goods_32_439138.jpg',
      retailer: {
        name: 'H&M',
        logo: 'https://asset.brandfetch.io/idZAyF9rlg/idv3zQZZsH.jpeg',
      },
      rating: {
        value: 4.6,
        count: 373,
      },
      inStock: false,
    },
    {
      id: '4',
      title: 'The Indian Garage Co. Full Sleeve Solid Men Jacket',
      price: '₹799.00*',
      image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439138/item/goods_32_439138.jpg',
      retailer: {
        name: 'Flipkart',
        logo: 'https://asset.brandfetch.io/idFaleeNmn/id5H7Kj9-_.png',
      },
      inStock: true,
    },
  ]

  return (
    <div className="min-h-screen bg-[#202124]">
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[1200px] mx-auto p-4">
        <div className="w-full lg:w-[500px]">
          <button className="mb-4 px-4 py-2 text-[#e8eaed] bg-[#303134] rounded-full text-sm hover:bg-[#3c4043] flex items-center gap-2">
            <Search className="w-4 h-4" />
            Find image source
          </button>
          <div className="relative flex flex-col">
            <div className="relative aspect-square max-w-[600px] bg-[#303134] rounded-lg overflow-hidden">
              {searchImage && <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                className="h-full"
                ruleOfThirds={false}
                keepSelection
                circularCrop={false}
                minWidth={50}
                minHeight={50}
                disabled={false}
                locked={false}
                renderSelectionAddon={() => null}
                style={
                  {
                    "--ReactCrop-border-color": "transparent",
                    "--ReactCrop-crop-area-border-color": "#8ab4f8",
                    "--ReactCrop-selection-background-color": "transparent",
                  } as React.CSSProperties
                }
              >
                <img
                  src={searchImage}
                  alt="Search image"
                  className="w-full h-full object-contain"
                />
              </ReactCrop>}

              <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="absolute -bottom-0 left-[10%] lg:-bottom-28 lg:left-20 sm:left-[20%] flex gap-2 p-1 bg-[#303134]/80 backdrop-blur-sm rounded-full">
              <button
                onClick={() => setSelectedTab("search")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedTab === "search"
                      ? "bg-[#8ab4f8] text-[#202124]"
                      : "text-[#e8eaed] hover:bg-[#3c4043]"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </span>
              </button>
              <button
                onClick={() => setSelectedTab("text")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedTab === "text"
                      ? "bg-[#8ab4f8] text-[#202124]"
                      : "text-[#e8eaed] hover:bg-[#3c4043]"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Text
                </span>
              </button>
              <button
                onClick={() => setSelectedTab("translate")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedTab === "translate"
                      ? "bg-[#8ab4f8] text-[#202124]"
                      : "text-[#e8eaed] hover:bg-[#3c4043]"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Translate
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[500px]">
          <h2 className="text-[#e8eaed] text-lg mb-4">Related searches</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-[#303134] rounded-xl overflow-hidden hover:bg-[#3c4043] cursor-pointer"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#202124]/80 backdrop-blur-sm rounded-full">
                    <span className="text-[#e8eaed] text-sm font-medium">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="relative w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={product.retailer.logo}
                        alt={product.retailer.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[#e8eaed] text-sm">
                      {product.retailer.name}
                    </span>
                  </div>
                  <h3 className="text-[#e8eaed] text-sm font-medium mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-[#e8eaed] text-sm">
                        {product.rating.value}
                      </span>
                      <Star className="w-3 h-3 fill-[#8ab4f8] text-[#8ab4f8]" />
                      <span className="text-[#9aa0a6] text-sm">
                        ({product.rating.count})
                      </span>
                    </div>
                  )}
                  <div className="mt-1">
                    {product.inStock ? (
                      <span className="text-green-500 text-sm">In stock</span>
                    ) : (
                      <span className="text-red-500 text-sm">Out of stock</span>
                    )}
                  </div>
                  {product.additionalImages && (
                    <div className="flex gap-1 mt-2">
                      {product.additionalImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-12 h-12 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`${product.title} - View ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6 text-sm text-[#9aa0a6]">
            <span>Did you find these results useful?</span>
            <div className="flex gap-4">
              <button className="text-[#8ab4f8] hover:underline">Yes</button>
              <button className="text-[#8ab4f8] hover:underline">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
