function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day);
  const filterAppointments = [];
  if (filteredDays[0]) {
    for (const d of filteredDays[0].appointments ) {
      filterAppointments.push(state.appointments[d]);
    }
  }
  return filterAppointments;
}

