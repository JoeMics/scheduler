import React from "react"; 

import 'components/InterviewerList';

const InterviewerList = () => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviedswer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
};

export default InterviewerList;