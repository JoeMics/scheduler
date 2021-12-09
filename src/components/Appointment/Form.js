import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
  /* props - editing
  student:String
  interviewer:Number
  interviewers:Array
  onSave:Function
  onCancel:Function 
  */

  /* props - creating
  interviewers:Array
  onSave:Function
  onCancel:Function
   */

  const {
    student,
    interviewer,
    interviewers,
    onSave,
    onCancel,
  } = props;

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList 
        interviewers={interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={onCancel} danger>Cancel</Button>
          <Button onClick={onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;