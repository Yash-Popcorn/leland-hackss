import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

function GoogleMaps() {
  const [id, _setId] = useState(v4());

  useEffect(function initMap() {
    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        const uluru = { lat: 37.238768, lng: -121.883805 };
        const map = new google.maps.Map(document.getElementById(`map-${id}`) as HTMLElement, {
          zoom: 10,
          center: uluru,
        });

        const marker = new google.maps.Marker({
          position: uluru,
          map: map,
        });
        clearInterval(interval);
      }
    }, 100);
  }, []);

  return <div id={`map-${id}`} style={{ height: '400px', width: '100%' }} />;
}

export default GoogleMaps;
