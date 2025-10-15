import React, { useState, useEffect, useRef, useMemo } from "react";
import ProductCard from "./ProductCard";


const LeftArrow = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const RightArrow = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default function Carousel({ offers = [], onViewProduct }) {
  const trackRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);


  const slides = useMemo(() => {
    if (!offers || offers.length === 0) return [];
    if (offers.length === 1) return [offers[0]];
    return [offers[offers.length - 1], ...offers, offers[0]];
  }, [offers]);

  const [currentIndex, setCurrentIndex] = useState(offers && offers.length > 1 ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track || !track.children || track.children.length === 0) return;
      const first = track.children[0];
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const w = Math.round(first.getBoundingClientRect().width + gap);
      setSlideWidth(w);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [slides]);

  useEffect(() => {
    setCurrentIndex(offers && offers.length > 1 ? 1 : 0);
    setIsTransitioning(false);
  }, [offers]);

  useEffect(() => {
    if (!offers || offers.length <= 1) return;
    autoPlayRef.current = setInterval(() => goToNext(), 3000);
    return () => clearInterval(autoPlayRef.current);
  
  }, [offers, slideWidth]);

  const goToNext = () => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((p) => p + 1);
  };
  const goToPrev = () => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((p) => p - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (slides.length <= 1) return;
    if (currentIndex >= slides.length - 1) {
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      setCurrentIndex(slides.length - 2);
    }
  };

  const pause = () => clearInterval(autoPlayRef.current);
  const play = () => {
    if (!offers || offers.length <= 1) return;
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => goToNext(), 3000);
  };
  
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const swipeThreshold = 50;
    if (diff > swipeThreshold) {
      goToNext();
    } else if (diff < -swipeThreshold) {
      goToPrev();
    }
    setTouchStart(null);
  };

  const offset = isNaN(slideWidth) ? 0 : -currentIndex * slideWidth;
  const trackStyle = {
    transform: `translateX(${offset}px)`,
    transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
  };
  const realCount = offers.length;
  const activeDotIndex = realCount > 0 ? ((currentIndex - 1) % realCount + realCount) % realCount : 0;

  if (!offers || offers.length === 0) return null;

  return (
    <div
      className="relative w-full max-w-md lg:max-w-6xl mx-auto h-[360px] overflow-hidden group"
      onMouseEnter={() => pause()}
      onMouseLeave={() => play()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {offers.length > 1 && (
        <>
          <button onClick={goToPrev} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 hover:bg-white transition opacity-0 group-hover:opacity-100" aria-label="Previous"> <LeftArrow /> </button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 hover:bg-white transition opacity-0 group-hover:opacity-100" aria-label="Next"> <RightArrow /> </button>
        </>
      )}
      <div className="h-full">
        <div ref={trackRef} className="flex h-full items-stretch gap-6" onTransitionEnd={handleTransitionEnd} style={trackStyle}>
          {slides.map((product, idx) => (
           
            <div key={`${product?.id ?? "no-id"}-${idx}`} className="w-full flex-shrink-0 sm:w-auto sm:min-w-[280px] lg:min-w-[320px]">
              <div className="h-full">
                <ProductCard product={product} onViewProduct={onViewProduct} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {realCount > 1 && (
        <div className="absolute bottom--2 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {offers.map((_, i) => (
            <button key={i} onClick={() => { setIsTransitioning(true); setCurrentIndex(i + 1); }} className={`pointer-events-auto h-2 w-2 rounded-full transition-colors ${i === activeDotIndex ? "bg-indigo-500" : "bg-gray-300"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}