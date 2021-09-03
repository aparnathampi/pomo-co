import React from 'react';
import { useHistory } from 'react-router-dom';
import InputField from '../textfield/textField';
import classes from './styles.scss';


const Header = (props) => {
const isHome = window.location.hash === '#/home';
  const { applyFilter } = props;
  const history = useHistory();
  return (
    <div className={classes.headerWrapper}>
      <div
        className={classes.backButton}
        role="presentation"
        onClick={() => history.goBack()}
      >
        <img src="/assets/svg/header/back.svg" alt="back" />
      </div>
      <div className={classes.rightWrapper}>
        {isHome && (
          <>
            <div className={classes.restoWrapper}>
              <img className={classes.restoIcon} src="/assets/svg/header/resto.svg" alt="resto" />
              <div className={classes.restoText}>Da Otto</div>
              <div className={classes.userExpandIconWrapper}>
                <img className={classes.upArrow} src="/assets/svg/up-arrow.svg" alt="up" />
                <img className={classes.downArrow} src="/assets/svg/down-arrow.svg" alt="down" />
              </div>
            </div>
            <div className={classes.searchFieldWrapper}>
              <InputField
                inputAdornment={<img
                  src="/assets/svg/header/search.svg"
                  alt="search"
                  className={classes.searchIcon}
                />}
                placeholder="Search for Restaurants  (Press Enter to search)"
                onChange={(e) => applyFilter({ filterType: 'restaurantName', filterValues: [e.target.value] })}
              />
            </div>
            <div className={classes.filter} onClick={() => props.onFilterOpen()} role="presentation"><img src="/assets/svg/header/filter.svg" alt="filter" /></div>
          </>
        )}
        <div className={classes.cart}><img src="/assets/svg/header/cart.svg" alt="cart" /></div>
      </div>
    </div>
  );
};

export default Header;
