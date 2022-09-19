import { useEffect, useMemo, useRef } from 'react';
import { v4 } from 'uuid';

function GoogleMaps() {
  const reference = useRef<HTMLDivElement | null>(null);

  useEffect(function initMap() {
    const interval = setInterval(() => {
      if (typeof google !== 'undefined' && reference) {
        clearInterval(interval);
        const uluru = { lat: 37.238768, lng: -121.883805 };
        const map = new google.maps.Map(reference.current as HTMLElement, {
          zoom: 10,
          center: uluru,
        });

        const marker = new google.maps.Marker({
          position: uluru,
          map: map,
        });
      }
    }, 100);
  }, []);

  return <div ref={reference} style={{ height: '400px', width: '100%' }} />;
}

export default GoogleMaps;
