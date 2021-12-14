import React, { useState, useEffect } from "react";

import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // fetch the json/api data from the proxy and push the value into state
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [ first, second, third ] = all;
      setState(prev => ({ ...prev,
        days:[...first.data], 
        appointments:{...second.data}, 
        interviewers:{...third.data}
      }));
    });
  }, []);

  // a function to change the days in the side
  const setDay = (day) => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments }))
      .catch((err) => console.log(err));
  };

  function cancelInterview(id) {
    const appointments = {
      ...state.appointments,
      [id]: { ...state.appointments[id], interview: null }
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }))
      .catch((err) => console.log(err));
  };

  // get the appointments and interviewers for that day
  // then map to fill the number of spot booked by someone
  // interview is for the spot that is booked and
  // interviewers is for a list of people available on that day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const parsedAppointment = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (<Appointment 
      key={appointment.id} 
      {...appointment} 
      interview={interview} 
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
