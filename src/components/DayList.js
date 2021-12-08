import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, onChange } = (props);

  const parsedDayList = days.map((day) => <DayListItem key={day.id} {...day} selected={day.name === props.day} setDay={onChange}/>);
  
  return (
    <ul> {parsedDayList} </ul>
  );
}