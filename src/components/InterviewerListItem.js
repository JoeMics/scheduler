import React from "react";
import classNames from "classnames";

import 'components/InterviewerListItem.scss'

const InterviewerListItem = (props) => {
  const { id, name, avatar, setInterviewer, selected } = props;

  const interviewerItemClass = classNames({
    "interviewers__item" : true,
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerItemClass} onClick={() => setInterviewer(id)} selected={selected}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;