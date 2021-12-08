import React from "react";
import classNames from "classnames";

import 'components/DayListItem.scss';

const DayListItem = (props) => {
  const { name, selected, spots, setDay } = props;
  
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots === 1) {
      return '1 spot remaining';
    }

    if (!spots) {
      return 'no spots remaining';
    }

    return `${spots} spots remaining`;
  }

  return (
    <li className={dayClass} onClick={() => setDay(props.name)}>
      <h2 className="text--regular" selected={selected}>{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};

export default DayListItem;