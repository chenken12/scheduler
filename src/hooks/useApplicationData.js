import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) { 
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

  const updateSpots = function(id, appointments) {
    const daysArr = [];
    for (const day of state.days) {
      let newDay = {...day};
      if (day.appointments.includes(id)) {
        let spots = 0;
        for (const i of day.appointments) {
          if (!appointments[i].interview) spots++;
        }
        newDay = { ...day, spots: spots };
      }
      daysArr.push(newDay);
    }
    return daysArr;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = updateSpots(id, appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, days:[...spots] }));
  };

  const cancelInterview = async function(id) {
    const appointments = {
      ...state.appointments,
      [id]: { ...state.appointments[id], interview: null }
    };

    const spots = updateSpots(id, appointments);

    return await axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days:[...spots] }))
  };

  return { state, setDay, bookInterview, cancelInterview };
};
