import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const Appointment = (props) => {
  /* props
  time: String ex. "4pm" 
  interview: Object
  interviewers: Array of interviewers for the day
  bookInterview: Function, to change state when interview is booked
  id: Number, id of appointment, 
  */

  const { time, interview, interviewers, bookInterview, id, cancelInterview } =
    props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // captures name and interviewer to pass to onSave
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    // Show SAVING animation before API call
    transition(SAVING);

    // transition to SHOW only after OK response
    return bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => console.log(err.message));
  };

  const deleteAppointment = () => {
    // change to DELETING animation
    transition(DELETING);

    // call cancel interview with id
    return cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          {...interview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
          interviewer={interview.interviewer.id}
          student={interview.student}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={() => back()}
          onConfirm={deleteAppointment}
        />
      )}
    </article>
  );
};

export default Appointment;
