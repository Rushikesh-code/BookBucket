import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <Link to={{
      pathname: props.path,
    }}>
      <li className='cards__item' onClick={props.onClick}>
        <div className='cards__item__link'>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default CardItem;
