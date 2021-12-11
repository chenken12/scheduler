import React from "react";

import "components/Appointment/styles.scss";

// in the available spot display a plus button which goes to From card
export default function Empty(props) {
  const { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}