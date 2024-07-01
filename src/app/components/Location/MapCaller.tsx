'use client';

import dynamic from 'next/dynamic';

const LazyLocation = dynamic(() => import("./Location"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function MapCaller(props:any) {
  return <LazyLocation {...props} />;
}

export default MapCaller;