import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './styles.scss';

const menu = [{
  itemName: 'Chicken Grill',
  itemCategory: 'Baked',
  itemPhoto: '/assets/png/Image.png',
  itemCost: '£19.80'
},
{
  itemName: 'Char-Broiled Chicken Shish',
  itemCategory: 'Hot Dish',
  itemPhoto: '/assets/png/Image-2.png',
  itemCost: '£22.89'
},
{
  itemName: 'Natural Vegetable Rice',
  itemCategory: 'Sweet',
  itemPhoto: '/assets/png/Image-3.png',
  itemCost: '£2.11'
},
{
  itemName: 'Chicken Grill',
  itemCategory: 'Sweet',
  itemPhoto: '/assets/png/Image.png',
  itemCost: '£19.80'
},
{
  itemName: 'Char-Broiled Chicken Shish',
  itemCategory: 'Hot Dish',
  itemPhoto: '/assets/png/Image-2.png',
  itemCost: '£22.89'
},
{
  itemName: 'Natural Vegetable Rice',
  itemCategory: 'Hot Dish',
  itemPhoto: '/assets/png/Image-3.png',
  itemCost: '£2.11'
}];

const RestaurantDetail = (props) => {
  const { fetchResturantDetails, restaurantDetails, fetchMenu } = props;
  const { id } = useParams();
  useEffect(() => {
    fetchResturantDetails(id);
  }, []);

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  const [menuData, setMenuData] = useState(menu);
  useEffect(() => {
    if (selected) {
      const tempMenu = menu.filter((item) => item.itemCategory === selected);
      setMenuData(tempMenu);
    } else setMenuData(menu);
  }, [selected]);
  useEffect(() => {
    if (menu) {
      setMenuData(menu);
    }
  }, [menu]);

  let categoryArray = [];
  let tempCategArray = [];
  useEffect(() => {
    if (menu && menu.length > 0) {
      categoryArray = menu.map((item) => item.itemCategory);
      const categorySet = new Set(categoryArray);
      const categoryArraySet = Array.from(categorySet);
      tempCategArray = categoryArraySet.map((item) => (
        { item, count: categoryArray.reduce((n, x) => n + (x === item), 0) }
      ));
    }
    setCategories(tempCategArray);
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
          {menuData && menuData.length > 0 && (
            <>
              <div className={classes.menuCategoryWrapper}>
                <div
                  role="presentation"
                  onClick={() => setSelected('')}
                  className={`${classes.category} ${selected === '' ? classes.selectedCategory : ''}`}
                >
All
                </div>
                {categories && categories.map((category) => (
                  <div
                    role="presentation"
                    onClick={() => setSelected(category.item)}
                    className={`${classes.category} ${selected === category.item ? classes.selectedCategory : ''}`}
                  >
                    {`${category.item} ${category.count > 0 && `(${category.count})`}`}
                  </div>))}
              </div>
              <div className={classes.menuHeading}>Menu</div>
              <div className={classes.menuListWrapper}>
                {menuData && menuData.map((item) => (
                  renderMenuItem(item)
                ))}
              </div>
            </>
          )}
        </>)}
    </div>
  );
};

export default RestaurantDetail;
