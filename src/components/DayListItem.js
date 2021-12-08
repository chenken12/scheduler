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
    if (spots === 0) {
      return `no spots remaining`;
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    }
    return `${spots} spots remaining`;
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