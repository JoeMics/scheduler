import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
  /* props - editing
  student:String, optional
  interviewer:Number, optional
  interviewers:Array
  onSave:Function, from parent, handles saving
  onCancel:Function 
  */

  // Handles conditional props
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const { interviewers, onSave, onCancel } = props;

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please choose an interviewer");
      return;
    }

    setError("");
    onSave(student, interviewer);
  };

  // Resets form fields
  const reset = () => {
    setStudent("");
    setError("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => validate()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
