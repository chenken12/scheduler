import React from "react";

import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, setDay } = props;
  const dayListClass = classNames('day-list__item', { 
    "day-list__item--selected": props.selected,
    "day-list__item--full": !spots
  }); 
  
  const formatSpots = function(fspots) {
    const num = (fspots) ? fspots : 'no';
    const s = (fspots === 1) ? '' : 's';

    return `${num} spot${s} remaining`;
  }

  return (
    <li className={dayListClass} onClick={() => setDay(name)} selected={props.selected}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">
        {formatSpots(spots)} 
      </h3>
    </li>
  );
}