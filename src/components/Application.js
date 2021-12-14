import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import "components/Application.scss";

const BASE_URL = "http://localhost:8001/api";

const Application = (props) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // setDay function to pass into DayList component
  const setDay = (day) => setState({ ...state, day });

  // changes local state when interview booked
  const bookInterview = (id, interview) => {
    // TODO: handle no interviewer error

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // return promise to handle 200 STATUS in Form component
    return axios
      .put(`${BASE_URL}/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({ ...prev, appointments }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  // sets interview data to null
  const cancelInterview = (id) => {
    // new appointment
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // new copy of state to update to
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // make API call to delete appointment in db, then update state
    return axios.delete(`${BASE_URL}/appointments/${id}`).then(() => {
      setState((prev) => ({ ...prev, appointments }));
    });
  };

  // API request to GET days, and appointments
  useEffect(() => {
    // ALL promises need to resolve for component to render
    const statePromises = [
      axios.get(`${BASE_URL}/days`),
      axios.get(`${BASE_URL}/appointments`),
      axios.get(`${BASE_URL}/interviewers`),
    ];

    Promise.all(statePromises)
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;

        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((err) => console.log(err.message));
  }, []);

  // Render appointments in Appointment components
  // Get arrays of appointments, and interviewers for the day
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

export default Application;
