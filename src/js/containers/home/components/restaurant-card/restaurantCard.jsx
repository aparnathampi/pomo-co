import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './styles.scss';

const RestaurantCard = (props) => {
  const history = useHistory();
  const { name, cover, status, description, id } = props;
  return (
    <div className={classes.cardWrapper} role="presentation" onClick={() => history.push(`/restaurant-detail/${id}`)}>
      <div className={classes.coverImage} style={{ backgroundImage: `url(${cover})` }} />
      <div className={classes.nameWrapper}>
        <div className={classes.name}>{name}</div>
        <div
          className={classes.status}
          style={{ background: status === 'Closed' && 'rgba(251, 109, 58, 0.1)', color: status === 'Closed' && '#FB6D3A' }}
        >
          {status}
        </div>
      </div>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default RestaurantCard;
