import React from 'react';
import Telephone from "./Telephone";
import Street from "./Street";
import ShareBar from "./ShareBar";
import CardImage from "./CardImage";
import Rating from "./Rating";
import Pricing from "./Pricing";
import "../styles/Card.css";
import Link from 'next/link';
import Tags from './Tags';

function Card({ data } : any) {
  //console.log(data?.address);
  let data2 = JSON.parse(data);
  //console.log(data2._id);
  return (

      <div className="card" key={crypto.randomUUID()}>
        <CardImage description={data2?.name} imageSourceUrl={data2?.photos}>
          <Rating starCount={data2?.rating}></Rating>
          <Pricing priceLevel={data2?.priceLevel}></Pricing>
        </CardImage>
        <Link href={`/descubrir/${data2?._id ?? ''}`} target='_blank'>
          <p className="descripcion hover:underline">{data2?.name}</p>
        </Link>
        <Tags tags={data2?.categories}></Tags>
        <div className='flexible' key={crypto.randomUUID()}>
          <Street url={data2?.url} address={data2?.address}></Street>
          <Telephone telephoneNumber={data2?.telephone}></Telephone>
        </div>
        <ShareBar url={data2?.url} website={data2?.website} name={data2?.name} address={data2?.address} id={data2?._id}></ShareBar>
      </div>

  );
}

export default Card;
