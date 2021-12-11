import React, { useState } from "react";

import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// the from to book a time in the day 
// display list of interviewer, 2 button and spot to fill user's name 
export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = function () {
    reset();
    onCancel();
  }
  const reset = function() {
    setStudent("");
    setInterviewer("");
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"

            value={ student }
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => onSave(student, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}