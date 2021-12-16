import React from "react";

import "components/Appointment/styles.scss";

// the loading card for deleting and saving
export default function Status(props) {
  const { message } = props;

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{ message }</h1>
    </main>
  );
}