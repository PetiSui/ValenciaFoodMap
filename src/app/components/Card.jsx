import React from 'react';
import Telephone from "./Telephone";
import Street from "./Street";
import ShareBar from "./ShareBar";
import ImageWithRating from "./ImageWithRating";
import Image from "./Image";
import Rating from "./Rating";
import Pricing from "./Pricing";
import Tags from "./Tags";
import "../styles/Card.css";

function Card({ data }) {
  //console.log(data?.address);
  let data2 = JSON.parse(data);
  //console.log(data2._id);
  return (

      <div className="card" key={crypto.randomUUID()}>
        {/* <ImageWithRating rating={data?.rating} description={data?.name} imageSourceUrl={imageSourceUrl}></ImageWithRating> */}
        <Image description={data2?.name} imageSourceUrl={data2?.photos}>
          <Rating starCount={data2?.rating}></Rating>
          <Pricing priceLevel={data2?.priceLevel}></Pricing>
        </Image>
        <p className="descripcion">{data2?.name}</p>
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
