import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./From";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

const CREATE = "CREATE";
const EDIT = "EDIT";

const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

// the main function for Appointment folder
// use a custom hook to change between element in the html
// base on what the user selected
export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode((interview) ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW));
  }

  function cancel() {
    transition(DELETE);
    cancelInterview(id)
      .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && <Show {...interview} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && <Form interviewers={[...interviewers]} onCancel={() => back()} onSave={save}/>}
      {mode === EDIT && <Form 
        student={interview.student} 
        interviewer={interview.interviewer.id} 
        interviewers={[...interviewers]} 
        onCancel={() => back()} onSave={save}
      />}

      {mode === SAVING && <Status  message={"Saving"} />}
      {mode === DELETE && <Status  message={"Deleting"} />}
      {mode === CONFIRM && <Confirm  message={"Delete the appointment?"} onCancel={() => back()} onConfirm={cancel}/>}
    </article>
  );
}