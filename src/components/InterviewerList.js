import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

const InterviewerList = (props) => {
  /* props:
   * interviewers: Array of objects
   * onChange: Function that accepts interviewer id
   *   pass down to InterviewerListItem
   * value: Number, id of selected interviewer
   */
  const { interviewers, onChange, value } = props;

  const interviewerListItemArray = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItemArray}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
