import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // get the appointments and interviewers for that day
  // then map to fill the number of spot booked by someone
  // interviewers is for a list of people(interviewers) available on that day
  const interviewers = getInterviewersForDay(state, state.day);

  const parsedAppointment = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (<Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={getInterview(state, appointment.interview)} 
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />);
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
        <DayList
          days={state.days}
          day={state.day}
          onChange={setDay}
        />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
       
      </section>

      <section className="schedule">
        { parsedAppointment }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
