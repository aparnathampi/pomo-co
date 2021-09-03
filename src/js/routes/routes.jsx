import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Filter, Header, Sidebar } from '../components';
import Home from '../containers/home';
import RestaurantDetail from '../containers/restaurant-detail';
import classes from '../rootStyles.scss';

const Routes = (props) => {
  const { saveFilters, filtersArray, allRestaurantData, isSortApplied, saveSort } = props;

  const [cuisines, setCuisines] = useState([]);
  let cuisinesArray = [];
  useEffect(() => {
    if (allRestaurantData && allRestaurantData.length > 0) {
      allRestaurantData.forEach((item) => {
        cuisinesArray = [...cuisinesArray, ...JSON.parse(item.restaurantCuisine)];
      });
      const cuisinesSet = new Set(cuisinesArray);
      cuisinesArray = Array.from(cuisinesSet);
    }
    setCuisines(cuisinesArray);
  }, [allRestaurantData]);
  const [isFilterOpen, toggleFilterOpen] = useState(false);
  const onFilterOpen = () => toggleFilterOpen(true);

  const applyFilter = (filters) => {
    saveFilters({ filterType: 'restaurantCuisine', filterValues: filters });
    toggleFilterOpen(false);
  };

  const applySort = (data) => {
    saveSort(data);
    toggleFilterOpen(false);
  };

  const onFilterClose = () => toggleFilterOpen(false);
  return (
    <div className={classes.container}>
      <div className={`${classes.background} ${isFilterOpen ? classes.blurfilter : ''}`}>
        <Sidebar />
        <div className={classes.wrapper}>
          <div className={classes.headerWrapper}>
            <Header onFilterOpen={onFilterOpen} applyFilter={saveFilters} />
          </div>
          <Route>
            <Switch>
              <Redirect from="/" to="/home" exact={true} />
              <Route path="/restaurant-detail/:id" component={RestaurantDetail} exact={true} />
              <Route path="/home" component={Home} exact={true} />
            </Switch>
          </Route>
        </div>

      </div>
      {isFilterOpen && (
      <div className={classes.foreground}>
        <Filter
          onFilterClose={onFilterClose}
          cuisines={cuisines}
          applyFilter={applyFilter}
          applySort={applySort}
          isSortApplied={isSortApplied}
          appliedFilters={filtersArray}
        />
      </div>
      )}
    </div>
  );
};
export default Routes;
