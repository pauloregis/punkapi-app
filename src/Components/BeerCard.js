import React from 'react';
import { Link } from 'react-router-dom';

const BeerCard = ({ beer }) => {
  const { id, name, tagline, image_url, abv, ibu, ebc } = beer;

  return (
    <Link to={`/beers/${id}`} className="card_item">
      <h1 className="card_item__title">{name}</h1>

      <div className="card_item__image">
        <img src={image_url} alt={`Bottle of ${name} beer`}/>
      </div>

      <div className="card_item__tagline">
        {tagline}
      </div>

      <div className="card_item__details">
        <span><strong>ABV:</strong> <span className="card_item__details__value">{abv || ' - '}</span></span>
        <span><strong>IBU:</strong> <span className="card_item__details__value">{ibu || ' - '}</span></span>
        <span><strong>EBC:</strong> <span className="card_item__details__value">{ebc || ' - '}</span></span>
      </div>
    </Link>
  );
};

export default BeerCard;