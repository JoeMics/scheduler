import Button from 'components/Button';
import React from 'react';

const Confirm = (props) => {
  /* props
  message: String, ex. "Are you sure you want to delete?"
  onConfirm: Function, when confirm clicked
  onCancel: Function, when cancel clicked
   */
  const { message, onConfirm, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button onClick={onCancel} danger>Cancel</Button>
        <Button onClick={onConfirm} danger>Confirm</Button>
      </section>
    </main>
  );
};

export default Confirm;