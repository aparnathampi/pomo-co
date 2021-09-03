import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './styles.scss';

const RestaurantDetail = (props) => {
  const { fetchResturantDetails, restaurantDetails, fetchMenu, menu } = props;
  const { id } = useParams();
  useEffect(() => {
    fetchResturantDetails(id);
  }, []);

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  let categoryArray = [];
  useEffect(() => {
    if (menu && menu.length > 0) {
      menu.forEach((item) => {
        categoryArray = [...categoryArray, ...JSON.parse(item.itemCategory)];
      });
      const categorySet = new Set(categoryArray);
      categoryArray = Array.from(categorySet);
    }
    setCategories(categoryArray);
  }, [menu]);

  useEffect(() => {
    if (restaurantDetails && restaurantDetails.restaurantName) {
      fetchMenu(restaurantDetails.restaurantName);
    }
  }, [restaurantDetails]);

  const renderMenuItem = (item) => {
    const { itemName, itemCost, itemPhoto } = item;
    const MenuItem = (
      <div className={classes.cardWrapper}>
        <div className={classes.coverImage} style={{ backgroundImage: `url(${itemPhoto})` }} />
        <div className={classes.nameWrapper}>
          <div className={classes.name}>{itemName}</div>
          <div className={classes.price}>{itemCost}</div>
        </div>
      </div>
    );
    return MenuItem;
  };
  return (
    <div>
      {restaurantDetails && restaurantDetails.restaurantName && (
        <>
          <div className={classes.restaurantDetailWrapper}>
            <div className={classes.detailWrapper}>
              <div className={classes.name}>{restaurantDetails.restaurantName}</div>
              <div className={classes.description}>{restaurantDetails.restaurantDescription}</div>
              <div className={classes.restaurantInfo}>
                <div className={classes.timingDetails}>
                  <img alt="clock" src="/assets/svg/clock.svg" />
                  <div className={classes.timingWrapper}>{restaurantDetails.openingHours}</div>
                </div>
                <div className={classes.timingDetails}>
                  <img alt="phone" src="/assets/svg/phone.svg" />
                  <div className={classes.timingWrapper}>{restaurantDetails.contactNumber}</div>
                </div>
                <div className={classes.timingDetails}>
                  <img alt="web" src="/assets/svg/web.svg" />
                  <div className={classes.timingWrapper}>{restaurantDetails.websiteUrl}</div>
                </div>
              </div>
            </div>
            <img alt="cover" src={restaurantDetails.restaurantImage} className={classes.restaurantImageWrapper} />
          </div>
          <div className={classes.separatorWrapper}>
            <div className={classes.separator} />
          </div>
          {menu && menu.length > 0 && (
            <>
              <div className={classes.menuCategoryWrapper}>
                <div className={`${classes.category} ${selected === '' ? classes.selectedCategory : ''}`}>All</div>
)
                {categories && categories.map((category) => (
                  <div
                    role="presentation"
                    onClick={() => setSelected(category)}
                    className={`${classes.category} ${selected === category ? classes.selectedCategory : ''}`}
                  >
                    {category}
                  </div>))}
              </div>
              <div className={classes.menuHeading}>Menu</div>
              {menu && menu.map((item) => (
                <div className={classes.menuListWrapper}>
                  {renderMenuItem(item)}
                </div>
              ))}
            </>
          )}
        </>)}
    </div>
  );
};

export default RestaurantDetail;
