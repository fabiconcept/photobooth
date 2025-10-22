import { generalMetadata } from '@/lib/MetaData';
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = generalMetadata;
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div
          className="fixed me cursor-pointer sm:bottom-10 bottom-5 sm:right-10 right-5 opacity-30 hover:opacity-100 group z-[90] peer"
        >
          Made by <Link href={"https://fabiconcept.online"} className="text-xl group-hover:text-blue-500 font-semibold" target="_blank">@Fabiconcept</Link>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <filter id="lensFilter" x="-50%" y="-50%" width="200%" height="150%" filterUnits="objectBoundingBox">
            {/* Create alpha channel for displacement */}
            <feComponentTransfer in="SourceAlpha" result="alpha">
              <feFuncA type="identity" />
            </feComponentTransfer>

            {/* Blur for smooth displacement */}
            <feGaussianBlur in="alpha" stdDeviation="40" result="blur" />

            {/* Top displacement - push content down */}
            <feOffset in="blur" dx="0" dy="-30" result="topBlur" />

            {/* Bottom displacement - push content up */}
            <feOffset in="blur" dx="0" dy="30" result="bottomBlur" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="bottomBlur"
              scale="60"
              xChannelSelector="A"
              yChannelSelector="A"
              result="bottomDisplace"
            />

            {/* Blend both displacements */}
            <feBlend mode="normal" in="topDisplace" in2="bottomDisplace" />
          </filter>
        </svg>
      </body>
    </html>
  );
}