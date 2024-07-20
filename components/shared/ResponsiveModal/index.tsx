import { cn } from '@/services/utils/cn';
import React, { useState, useEffect, useRef } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ResponsiveModal = ({ isOpen, onClose, children }: IProps) => {
    console.log('14');
    
    const [isMobile, setIsMobile] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
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
      document.body.style.overflow = 'unset';
      setCurrentY(0)
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(0); // Reset currentY to ensure smooth dragging
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) {
      setCurrentY(diff);
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > window.innerHeight * 0.5) {
      onClose();
    } else {
      setCurrentY(0);
    }
  };
  
  const emptyHandler = () => {};
  
  if (!isOpen) return null;
  
  const modalStyle = isMobile ? { transform: `translateY(${currentY}px)` } : {};
  console.log('14');
  
  return (
    <div 
      className={cn('fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center',
        `${isMobile ? 'items-end' : 'items-center'}`)}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={cn('bg-white p-5 pt-0 w-full max-w-lg max-h-[85vh] overflow-y-auto',
          `${isMobile ? 'max-w-full' : 'max-w-lg'}`,
          `${isMobile 
            ? 'rounded-t-3xl h-[85vh] transition-transform duration-300 ease-out'
            : 'rounded-lg'}`,
          'min-[2800px]:p-10 rounded-3xl min-[2800px]:max-w-5xl',
        )}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        // onTouchStart={isMobile ? handleTouchStart : emptyHandler}
        // onTouchMove={isMobile ? handleTouchMove : emptyHandler}
        // onTouchEnd={isMobile ? handleTouchEnd : emptyHandler}
      >
        {isMobile && (
          <div className='h-10 pt-5'>
            <div 
              className="w-10 h-1 bg-gray-300 rounded mx-auto mb-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
          
        )}
        {!isMobile ? (
          <button 
            className="float-right text-2xl bg-transparent border-none cursor-pointer min-[2800px]:text-4xl"
            onClick={onClose}
          >
            &times;
          </button>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default ResponsiveModal;
