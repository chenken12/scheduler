import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./From";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

const CREATE = "CREATE";
const EDIT = "EDIT";

const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

    transition(SAVING, true);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function cancel() {
    transition(DELETE, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
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

      {mode === ERROR_SAVE && <Error  message={"Error while Saving"} onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error  message={"Error while Deleting"} onClose={() => back()}/>}
    </article>
  );
}