/*
 * input: Object: state, String: day
 *  
 * output: Array of appointments for day
 */
export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find(appointment => appointment.name === day);

  if (!selectedDay) {
    return [];
  }

  return selectedDay.appointments.map(appointmentId => {
    return state.appointments[appointmentId];
  });
};

/*
 * input: Object: state, String: day
 *  
 * output: Array of appointments for day
 */
export const getInterviewersForDay = (state, day) => {
  const selectedDay = state.days.find(appointment => appointment.name === day);

  if (!selectedDay) {
    return [];
  }

  return selectedDay.appointments.map(appointmentId => {
    return state.appointments[appointmentId];
  });
};

/*
 * input: Object: state, Object: interview
 *  
 * output: Object { student, interviewer: { id, name, avatar}}
 */
export const getInterview = (state, interview) => {
  if (!interview) return null;

  const  { student, interviewer } = interview;
  
  return {
    student,
    interviewer: state.interviewers[interviewer],
  };
};