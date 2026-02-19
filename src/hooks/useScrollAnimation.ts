import { useEffect } from 'react';

export function useScrollAnimation(dependencies: any[] = []) {
  useEffect(() => {
    let observer: IntersectionObserver;

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
      animatedElements.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, dependencies);
}
