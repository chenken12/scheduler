import React, { useState } from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const { name, avatar } = props;
  // const [interviewer, setInterviewer] = useState();

  let interviewerListClass = classNames('interviewers__item', { 
    "interviewers__item--selected": props.selected
  }); 

  return (
    <li className={ interviewerListClass } onClick={() => props.setInterviewer(name)}>
      <img
        className="interviewers__item-image"
        src={ avatar }
        alt={ name }
      />
      { props.selected && name }
    </li>
  );
}