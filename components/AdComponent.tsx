'use client';

import { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins 
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6272836017246600"
      data-ad-slot="5054851327"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdComponent;