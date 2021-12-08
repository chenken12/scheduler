import React from "react";
// import classNames from "classnames";

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer} = (props);
  //const [interviewer, setInterviewer] = useState('');

  const parsedInterviewersList = interviewers.map((interviewer) => 
    <InterviewerListItem 
      key={interviewer.id} 
      {...interviewer} 
      selected={interviewer.id === props.interviewer} 
      setInterviewer={setInterviewer}/>
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> { parsedInterviewersList } </ul>
    </section>
  );
}