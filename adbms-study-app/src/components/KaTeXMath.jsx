import React, { useEffect, useRef } from 'react';
import katex from 'katex';

export default function KaTeXMath({ math, block = false, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && math) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
        containerRef.current.innerText = math;
      }
    }
  }, [math, block]);

  return <span ref={containerRef} className={`katex-wrapper ${block ? 'block text-center my-2' : 'inline'} ${className}`} />;
}
