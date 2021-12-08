import React from "react";

import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, setDay } = props;
  let dayListClass = classNames('day-list__item', { 
    "day-list__item--selected": props.selected,
    "day-list__item--full": !spots
  }); 
  
  const formatSpots = function() {
    const num = (spots) ? spots : 'no';
    const s = (spots === 1) ? '' : 's';
    
    return `${num} spot${s} remaining`;
  }

  return (
    <li className={dayListClass}>
      <h2 className="text--regular">{name}</h2> 
      <h3 onClick={() => setDay(name)} className="text--light">
        {formatSpots()} 
      </h3>
    </li>
  );
}