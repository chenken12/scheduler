import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { time, interview } = props;

  const display = function() {
    if (interview) {
      return <Show {...interview}/>;
    }
    return <Empty />
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {display()}
    </article>
  );
}