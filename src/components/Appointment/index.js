import React from "react";

import "components/Appointment/styles.scss";

// import Appointment from "components/Appointment";

export default function Appointment(props) {

  return (
    <article className="appointment">
      {props.time && `Appointment at ${props.time}`}
      {!props.time && `No Appointments`}
    </article>
  );
}