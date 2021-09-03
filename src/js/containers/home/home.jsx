import React, { useEffect, useState } from 'react';
import RestaurantCard from './components/restaurant-card/restaurantCard';
import classes from './styles.scss';

const Home = (props) => {
  const { fetchAllRestaurants, allRestaurants, applyFilter, allRestaurantData } = props;
  const [categories, setCategories] = useState([]);
  let categoryArray = [];
  useEffect(() => {
    if (allRestaurantData && allRestaurantData.length > 0) {
      allRestaurantData.forEach((item) => {
        categoryArray = [...categoryArray, ...JSON.parse(item.restaurantCategory)];
      });
      const categorySet = new Set(categoryArray);
      categoryArray = Array.from(categorySet);
    }
    setCategories(categoryArray);
  }, [allRestaurantData]);
  useEffect(() => {
    fetchAllRestaurants();
  }, []);
  const renderCategories = (category) => {
    const categoryCard = (
      <div
        className={classes.categoryWrapper}
        role="presentation"
        onClick={() => applyFilter({ filterType: 'restaurantCategory', filterValues: [category] })}
      >
        <img className={classes.categoryIcon} src={`/assets/svg/${category}.svg`} alt={category} />
        <div className={classes.categoryName}>{category}</div>
      </div>
    );
    return categoryCard;
  };
  return (
    <div className={classes.homeWrapper}>
      {allRestaurants && allRestaurants.length > 0 && (
        <>
          <div className={classes.mainHeading}>Category</div>
          <div className={classes.categoryListWrapper}>
            <div
              className={classes.categoryWrapper}
              role="presentation"
              onClick={() => applyFilter({ filterType: 'restaurantCategory', filterValues: [] })}
            >
              <div className={classes.categoryName}>All</div>
            </div>
            {categories && categories.map((item) => renderCategories(item))}
          </div>
          <div className={classes.subHeading}>Restaurants</div>
          <div className={classes.restaurantListingWrapper}>
            {allRestaurants && allRestaurants.map((restaurant) => (
              <RestaurantCard
                name={restaurant.restaurantName}
                cover={restaurant.restaurantImage}
                id={restaurant.id}
                description={restaurant.restaurantDescription}
                status={restaurant.isOpen ? 'Open now' : 'Closed'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
