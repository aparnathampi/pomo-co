import React, { useState } from 'react';
import classes from './styles.scss';

const sidebarList = [
  {
    id: 'home',
    name: 'Home',
    count: 0
  }, {
    id: 'orders',
    name: 'Orders',
    count: 0
  }, {
    id: 'notification',
    name: 'Notification',
    count: 2
  }, {
    id: 'help',
    name: 'Help & Support',
    count: 0
  }, {
    id: 'settings',
    name: 'Settings',
    count: 0
  }
];

const Sidebar = () => {
  const [selected, setSelected] = useState('home');
  const renderSidebarItems = (sidebarItem) => {
    const { id, name, count } = sidebarItem;
    const sidebarItems = (
      <div className={classes.sidebarListItem} style={{ background: selected === id && '#503E9D' }} role="presentation" onClick={() => setSelected('home')}>
        <div className={classes.sidebarItemWrapper}>
          <img
            className={classes.sidebarIcon}
            src={`/assets/svg/sidebar/${id}${selected === id ? '_active' : ``}.svg`}
            alt={id}
          />
          <div className={`${classes.sidebarItem} ${selected === id ? classes.active : ''}`}>
            {name}
          </div>
        </div>
        {count > 0 && (<div className={classes.sidebarItemCount}>{count}</div>)}
      </div>
    );
    return sidebarItems;
  };
  return (
    <div className={classes.outerWrapper}>
      <div className={classes.topWrapper}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} alt="logo" src="/assets/logo.svg" />
          <div className={classes.logoName}>Pomo & co</div>
        </div>
        <div className={classes.sidebarItemsWrapper}>{sidebarList && sidebarList.map((item) => renderSidebarItems(item))}</div>
      </div>
      <div className={classes.bottomWrapper}>
        <div className={classes.orderWrapper}>
          <div className={classes.closeIconWrapper}><img alt="close" src="/assets/svg/close-icon.svg" /></div>

          <div className={classes.timeIconWrapper}><img alt="clock" src="/assets/svg/clock-side.svg" /></div>

          <div className={classes.orderReady}>Your Order is now Ready  </div>
          <div className={classes.orderDetails}>
            <div>Splint Doumo</div>
            <div>Order Id: #ED564F</div>
          </div>

          <div className={classes.detailsButton}>
            Details
            <img alt="right-arrow" src="/assets/svg/right-arrow.svg" />
          </div>
        </div>
        <div className={classes.userWrapper}>
          <div className={classes.userDetailWrapper}>
            <div className={classes.username}>Mark Clarke</div>
            <div className={classes.useremail}>markclarke@gmail.com</div>
          </div>
          <div className={classes.userExpandIconWrapper}>
            <img className={classes.upArrow} src="/assets/svg/up-arrow.svg" alt="up" />
            <img className={classes.downArrow} src="/assets/svg/down-arrow.svg" alt="down" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
