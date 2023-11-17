"use client";
import React, { useEffect, useRef, useState } from "react";

const JoinNow = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targetCount = 6000;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        animateCounter(targetCount);
        observer.disconnect(); // Stop observing once animation starts
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5,
    });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect(); // Clean up the observer when component unmounts
    };
  }, []);

  const animateCounter = (targetCount: number) => {
    let currentCount = targetCount - 50;
    if (currentCount < 0) {
      currentCount = 0;
    }

    const interval = setInterval(() => {
      currentCount++;
      setUserCount(currentCount);

      if (currentCount === targetCount) {
        clearInterval(interval);
      }
    }, 50);
  };

  return (
    <div className="counter-container" ref={counterRef}>
      <span>{userCount}</span> Users
    </div>
  );
};

export default JoinNow;
