"use client";
import React, { useEffect, useRef, useState } from "react";

const JoinNow = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let targetCount: number = 20;
    const fetchUserCount = async () => {
      const response = await fetch(`/api/user/count`);
      if (!response.ok) {
        targetCount = 20;
      } else {
        const responseJSON = await response.json();
        targetCount = responseJSON.userCount;
      }
    };
    fetchUserCount();

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
    <div className="w-1/2 flex justify-center" ref={counterRef}>
      <div className="prose p-6 border border-solid rounded-lg text-center">
        <h2 className="text-primary">Join Today!</h2>
        <h3>Prepify has currently{" " + userCount} Users!</h3>
      </div>
    </div>
  );
};

export default JoinNow;
