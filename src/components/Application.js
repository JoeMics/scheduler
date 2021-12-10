import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';

import 'components/Application.scss';

const Application = (props) => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // setDay function to pass into DayList component
  const setDay = (day) => setState({ ...state, day });

  // API request to GET days, and appointments
  useEffect(() => {
    const baseUrl = 'http://localhost:8001/api';

    // ALL promises need to resolve for component to render
    const statePromises = [
      axios.get(`${baseUrl}/days`),
      axios.get(`${baseUrl}/appointments`),
      axios.get(`${baseUrl}/interviewers`)
    ];

    Promise.all(statePromises).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState((prev) => ({...prev, days, appointments, interviewers}));
    });
  }, []);

  // Render appointments in Appointment components
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment 
        {...appointment}
        key={appointment.id}
        interview={interview}
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
          <DayList 
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
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