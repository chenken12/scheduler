import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = function(props) {
  const { interviewers, onChange, value} = (props);

  // create a list of Interviewer for that day
  // so if user want to book or change interviewer on that day
  const parsedInterviewersList = interviewers.map((interviewer) => (
    <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value} 
      setInterviewer={() => onChange(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> { parsedInterviewersList } </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;