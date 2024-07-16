import { cn } from '@/services/utils/cn';
import React, { useState, useEffect, useRef } from 'react';

interface IProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const FilterModal = ({ isOpen, onClose, children }: IProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef(null);
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
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
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
    if (currentY > window.innerHeight * 0.2) {
      onClose();
    } else {
      setCurrentY(0);
    }
  };

  const emptyHandler = () => {};

  if (!isOpen) return null;

  const modalStyle = isMobile ? { transform: `translateY(${currentY}px)` } : {};

  return (
    <div 
      className={cn('fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center',
        `${isMobile ? 'items-end' : 'items-center'}`)}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={cn('bg-white p-5 w-full max-w-lg max-h-[90vh] overflow-y-auto',
          `${isMobile ? 'max-w-full' : 'max-w-lg'}`,
          `${isMobile 
            ? 'rounded-t-3xl h-[90vh] transition-transform duration-300 ease-out'
            : 'rounded-lg'}`)}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={isMobile ? handleTouchStart : emptyHandler}
        onTouchMove={isMobile ? handleTouchMove : emptyHandler}
        onTouchEnd={isMobile ? handleTouchEnd : emptyHandler}
      >
        {isMobile && (
          <div className="w-10 h-1 bg-gray-300 rounded mx-auto mb-4" />
        )}
        {!isMobile ? (
          <button 
          className="float-right text-2xl bg-transparent border-none cursor-pointer"
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

export default FilterModal;