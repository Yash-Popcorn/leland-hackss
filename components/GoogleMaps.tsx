import { useEffect, useMemo, useRef } from 'react';

function GoogleMaps({ markers, onClickMarker }: { markers: [string, string][], onClickMarker: any }) {
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

        for (const marker of markers) {
          const loc = marker[1].split(', ');
          const markerInstance = new google.maps.Marker({
            position: {
              lat: parseFloat(loc[0]),
              lng: parseFloat(loc[1])
            },
            map: map,
          });
          markerInstance.addListener('click', () => {
            onClickMarker(marker[0]);
          });
        }
      }
    }, 100);
  }, []);

  return <div ref={reference} style={{ height: '400px', width: '100%' }} />;
}

export default GoogleMaps;
