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
  const [error, setError] = useState("");

  // go back to last mode and reset the fields
  const cancel = function () {
    reset();
    onCancel();
  }
  const reset = function() {
    setStudent("");
    setError("");
    setInterviewer(null);
  }

  // check if the input box is blank
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } 
    if (interviewer === null) {
      setError("Must select an interviewer");
      return;
    }
  
    setError("");
    onSave(student, interviewer);
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

            data-testid="student-name-input"
            value={ student }
            onChange={(event) => setStudent(event.target.value)}
          />
          <section className="appointment__validation">{error}</section>
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
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
