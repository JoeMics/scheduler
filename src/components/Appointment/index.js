import React, { Fragment } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import 'components/Appointment/styles.scss';

const Appointment = (props) => {
  /* props
  time: String ex. "4pm" 
  interview: Object
  */

  const { time , interview } = props;

  return (
    <article className="appointment">
      <Header time={time}/>
      {interview ? <Show /> : <Empty/>}
    </article>
  );
};

export default Appointment;