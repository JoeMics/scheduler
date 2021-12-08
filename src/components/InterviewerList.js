import React from "react"; 
import InterviewerListItem from "./InterviewerListItem";

import 'components/InterviewerList.scss';

const InterviewerList = (props) => {
  /* props:
  interviewers: array of objects
  setInterviewer: function that accepts interviewer id
    pass down to InterviewerListItem
  interviewer:number, id of selected interviewer
   */
  const { interviewers, setInterviewer, interviewer } = props;

  const interviewerListItemArray = interviewers.map(person => {
    return (
      <InterviewerListItem 
        selected={person.id === interviewer}
        setInterviewer={() => setInterviewer(person.id)}
        key={person.id}
        name={person.name}
        avatar={person.avatar}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItemArray}
      </ul>
    </section>
  );
};

export default InterviewerList;