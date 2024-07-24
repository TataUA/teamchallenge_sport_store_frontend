import { cn } from '@/services/utils/cn';
import React, { useState, useEffect, useRef } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wrapperClassname?: string
  buttonText: string
}
const FullSizeModalOnMobiles = ({ isOpen, onClose, children, wrapperClassname, buttonText }: IProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      if(document.body.style.overflow === 'hidden') document.body.style.overflow = 'unset';
      setCurrentY(0)
    }
    return () => {
      if(document.body.style.overflow === 'hidden') document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={cn('fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center',
        `${isMobile ? 'items-end' : 'items-center'}`)}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={cn('bg-white p-5 pt-5 w-auto max-w-lg h-auto overflow-y-auto',
          `${isMobile ? 'w-full h-full max-w-full' : 'max-w-lg md:max-h-[70vh] md:max-w-[75vw] lg:max-h-[70vh]'}`,
          `${isMobile 
            ? 'transition-transform duration-300 ease-out'
            : 'rounded-lg max-h-[]'}`,
          'min-[2800px]:p-10 min-[2800px]:rounded-3xl min-[2800px]:max-w-5xl', 
          'md:pt-6',
          `${wrapperClassname?.length ? wrapperClassname : ''}`,
        )}
      >
        <div className='flex w-full justify-between items-center mb-5'>
          <button 
            className='flex items-center gap-2'
            onClick={onClose}
          >
            <span>&lt;</span>
            {buttonText}
          </button>
          <button 
            className={cn("flex items-center justify-center size-6 text-2xl bg-transparent border-none cursor-pointer",
              '[&>span]:w-full [&>span]:text-2xl [&>span]:h-full', 
              'min-[2800px]:text-4xl',
            )}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default FullSizeModalOnMobiles
