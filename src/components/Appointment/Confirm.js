import React from "react";

import "components/Appointment/styles.scss";
import Button from "components/Button";

// Confirm card when user goes to remove an interview
export default function Confirm(props) {
  const { message, onCancel, onConfirm} = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{ message }</h1>
      <section className="appointment__actions">
        <Button onClick={onCancel} danger>Cancel</Button>
        <Button onClick={onConfirm} danger>Confirm</Button>
      </section>
    </main>
  );
}