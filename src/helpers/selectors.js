export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day);
  const filterAppointments = [];
  if (filteredDays[0]) {
    for (const d of filteredDays[0].appointments ) {
      filterAppointments.push(state.appointments[d]);
    }
  }
  return filterAppointments;
};

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: {
        ...state.interviewers[interview.interviewer]
      }
    }; 
  }
  return interview;
};
