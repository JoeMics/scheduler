import axios from "axios";

const { useState, useEffect } = require("react");

const BASE_URL = "http://localhost:8001/api";

const useApplicationData = () => {
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // return promise to handle 200 STATUS in Form component
    return axios.put(`${BASE_URL}/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments }));
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

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;