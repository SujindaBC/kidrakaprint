'use client';

import { useEffect, useRef } from 'react';

const AdComponent = ({ className = '' }) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`${className} overflow-hidden`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: '100px',
        }}
        data-ad-client="ca-pub-6272836017246600"
        data-ad-slot="5054851327"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdComponent;