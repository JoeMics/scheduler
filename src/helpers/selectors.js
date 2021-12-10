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