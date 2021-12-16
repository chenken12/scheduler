// return a list of filtered Appointments that match with the day
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

// return a list of filtered Interviewers that match with the day
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day);
  const filterInterviewers = [];
  if (filteredDays[0]) {
    for (const d of filteredDays[0].interviewers ) {
      filterInterviewers.push(state.interviewers[d]);
    }
  }
  return filterInterviewers;
};

// return an object with the interviewer info(id, name, avatar) and student name
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
