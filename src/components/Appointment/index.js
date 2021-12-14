import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

const Appointment = (props) => {
  /* props
  time: String ex. "4pm" 
  interview: Object
  interviewers: Array of interviewers for the day
  bookInterview: Function, to change state when interview is booked
  id: Number, id of appointment, 
  */
 
  const { time , interview, interviewers, bookInterview, id } = props; 

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // captures name and interviewer to pass to onSave
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    // transition to SHOW only after OK response
    bookInterview(id ,interview).then(() => transition(SHOW))
      .catch((err) => console.log(err.message));
  };
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show 
          {...interview}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
    </article>
  );
};

export default Appointment;