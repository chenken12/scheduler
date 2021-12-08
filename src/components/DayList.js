import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, setDay } = (props);

  const parsedDayList = days.map((day) => <DayListItem key={day.id} {...day} selected={day.name === props.day} setDay={props.setDay}/>);
  
  return (
    <ul> {parsedDayList} </ul>
  );
}