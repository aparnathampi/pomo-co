import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import classes from './styles.scss';


const Filter = (props) => {
  const { cuisines, onFilterClose, applyFilter, appliedFilters, applySort, isSortApplied } = props;
  const [appliedFilterState, setAppliedFilterState] = useState(appliedFilters.restaurantCuisine || []);
  const [sortApplied, setSortApplied] = useState(isSortApplied);
  useEffect(() => {
    setSortApplied(isSortApplied);
  }, [isSortApplied]);
  useEffect(() => {
    if (appliedFilters && appliedFilters.restaurantCuisine) {
      setAppliedFilterState(appliedFilters.restaurantCuisine);
    }
  }, [appliedFilters]);
  const onChangeFilter = (cuisine) => {
    const tempAppliedfilters = [...appliedFilterState];
    const index = tempAppliedfilters.findIndex((item) => item === cuisine);
    if (index > -1) {
      tempAppliedfilters.splice(index, 1);
    } else tempAppliedfilters.push(cuisine);
    setAppliedFilterState(tempAppliedfilters);
  };
  return (
    <div className={classes.filterWrapper}>
      <div className={classes.topWrapper}>
        <div className={classes.header}>
                    Search filters
          <img alt="close" src="/assets/svg/sidebar/close.svg" role="presentation" onClick={onFilterClose} />
        </div>
        <div className={classes.filterGroup}>
          <div className={classes.filterHeading}>Sort by</div>
          <div
            className={classes.openWrapper}
            role="presentation"
            style={{ color: sortApplied && '#FB6D3A' }}
            onClick={() => {
              setSortApplied(!sortApplied);
              applySort(!sortApplied);
            }}
          >
            <div className={`${classes.iconWrapper} ${sortApplied ? classes.sortActive : ''}`}>
              <img alt="open" src={sortApplied ? '/assets/svg/sidebar/Fire.svg' : '/assets/svg/sidebar/Fire-inactive.svg'} />
            </div>
                        Open
          </div>
        </div>
        <div className={classes.filterGroup}>
          <div className={classes.filterHeading}>Cuisine</div>
          <div className={classes.filterItemWrapper}>
            <div
              role="presentation"
              onClick={() => { setAppliedFilterState([]); }}
              className={`${classes.filterItem} ${appliedFilterState && appliedFilterState.length === 0 ? classes.selectedFilter : ''}`}
            >
All
            </div>
            {cuisines && cuisines.map((cuisine) => (
              <div
                role="presentation"
                onClick={() => onChangeFilter(cuisine)}
                className={`${classes.filterItem} ${appliedFilterState && appliedFilterState.includes(cuisine) ? classes.selectedFilter : ''}`}
              >
                {cuisine}
              </div>
            ))}
          </div>
          <div className={classes.seeMore}>
See more
            <img alt="" src="/assets/svg/down-arrow.svg" />
          </div>
        </div>
      </div>
      <Button label="Apply filters" onClick={() => applyFilter(appliedFilterState)} />
    </div>
  );
};
export default Filter;
