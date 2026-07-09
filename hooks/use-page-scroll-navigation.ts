'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UsePageScrollNavigationProps {
  pages: Array<{ path: string }>;
  currentPath: string;
  locale: string;
  scrollThreshold?: number;
  debounceTime?: number;
  enabled?: boolean;
}

export function usePageScrollNavigation({
  pages,
  currentPath,
  locale,
  scrollThreshold = 50,
  debounceTime = 400,
  enabled = true,
}: UsePageScrollNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled) return;

    let clickCount = 0;
    let clickTimeout: NodeJS.Timeout | null = null;
    const doubleClickDelay = 300; // ms between clicks

    // Prevent text selection on document
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    const handleClick = (event: MouseEvent) => {
      // Prevent text selection
      event.preventDefault();

      clickCount++;

      if (clickCount === 1) {
        // First click - wait for potential second click
        clickTimeout = setTimeout(() => {
          clickCount = 0; // Reset if no second click
        }, doubleClickDelay);
      } else if (clickCount === 2) {
        // Second click - double click detected
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          clickTimeout = null;
        }

        const currentIndex = pages.findIndex((page) =>
          pathname.toLowerCase().includes(page.path.toLowerCase())
        );

        if (currentIndex !== -1) {
          // Determine if click is in top or bottom half of screen
          const isBottomHalf = event.clientY > window.innerHeight / 2;

          let nextIndex = currentIndex;

          if (isBottomHalf) {
            // Click in bottom half - go to next page
            nextIndex = Math.min(currentIndex + 1, pages.length - 1);
          } else {
            // Click in top half - go to previous page
            nextIndex = Math.max(currentIndex - 1, 0);
          }

          if (nextIndex !== currentIndex) {
            router.push(`/${locale}${pages[nextIndex].path}`);
          }
        }

        clickCount = 0; // Reset
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [enabled, pages, pathname, locale, router]);
}
