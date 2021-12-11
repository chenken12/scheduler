import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, onChange } = (props);

  console.log("days:", days);
  const parsedDayList = days.map((day) => (
    <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day} 
      setDay={onChange}
    />
  ));
  
  return (
    <ul> {parsedDayList} </ul>
  );
}