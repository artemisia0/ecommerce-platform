'use client';

import Image from 'next/image';


export default function ImageGallery({ imageURLs }: { imageURLs: string[] }) {
  return (
    <div className="relative w-[320px] h-[320px] overflow-hidden">
      <div className="absolute inset-0 flex flex-col gap-0 overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {imageURLs.map((img, index) => (
          <div key={index} className="w-[320px] h-[320px] snap-center flex-shrink-0">
            <Image
              src={img}
              width={320}
              height={320}
              alt={`Picture of item ${index + 1}`}
              className="object-cover"
              priority={index === 0} // prioritize the first image
            />
          </div>
        ))}
      </div>
    </div>
  );
}

