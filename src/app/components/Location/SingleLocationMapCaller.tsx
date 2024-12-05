'use client';

import dynamic from 'next/dynamic';

const LazyLocation = dynamic(() => import("./SingleLocation"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function SingleLocationMapCaller(props:any) {
  return <LazyLocation {...props} />;
}

export default SingleLocationMapCaller;