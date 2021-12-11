import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/styles.scss';

const Appointment = (props) => {
  /* props
  time: String ex. "4pm" 
  interview: Object
  */
 
  const { time , interview } = props;
 
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {interview ?
        <Show {...interview}/> 
      : 
        <Empty/>
      }
    </article>
  );
};

export default Appointment;