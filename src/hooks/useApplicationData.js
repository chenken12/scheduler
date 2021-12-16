import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// a function to update Spots info on the sidebar
// when a user delete or adds a new appointment
const updateSpots = function(state, id, appointments) {
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

const reducer = function(state, action) {
  const { day, days, appointments, interviewers, id, interview } = action;
  switch (action.type) {
    case SET_DAY:
      return { ...state, day };
    case SET_APPLICATION_DATA:
      return { ...state, days, appointments, interviewers };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[id],
        interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots(state, id, appointments);

      return { ...state, appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData(initial) { 
  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({ type: SET_APPLICATION_DATA,
        days: first.data, 
        appointments: second.data, 
        interviewers: third.data
      });
    });
  }, []);

  // a function to change the days in the side
  const setDay = (day) => dispatch({type: SET_DAY, day:day});

  //update html and push into api when user add a new Interview 
  const bookInterview = function(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type:SET_INTERVIEW, id, interview }));
  };

  //update html and push into api when user delete an Interview 
  const cancelInterview = function(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type:SET_INTERVIEW, id, interview:null }));
  };

  return { state, setDay, bookInterview, cancelInterview };
};
