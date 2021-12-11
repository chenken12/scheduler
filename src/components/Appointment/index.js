import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./From";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

// the main function for Appointment folder
// use a custom hook to change between element in the html
// base on what the user selected
export default function Appointment(props) {
  const { time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode((interview) ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && <Show {...interview}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={[...interviewers]} onCancel={() => back()}/>}
    </article>
  );
}