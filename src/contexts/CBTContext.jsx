/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer, useEffect } from "react";

// Define the initial state for the CBT context
const initialState = {
  currentQuestionIndex: 0,
  selectedAnswers: {},
  answeredQuestions: [],
  score: 0,
  timer: {
    initialTime: 0,
    timeLeft: 0,
  },
  cbtStarted: false, // Flag to indicate whether the CBT has started
};

// Create a context for the CBT
const CBTContext = createContext();

// Define actions (action types) for the CBT
const CBT_ACTIONS = {
  SELECT_ANSWER: "SELECT_ANSWER",
  NEXT_QUESTION: "NEXT_QUESTION",
  PREV_QUESTION: "PREV_QUESTION",
  CALCULATE_SCORE: "CALCULATE_SCORE",
  SET_TIMER: "SET_TIMER",
  START_CBT: "START_CBT", // Action to start the CBT
};

// Define a reducer function to handle CBT actions
function cbtReducer(state, action) {
  switch (action.type) {
    case CBT_ACTIONS.SELECT_ANSWER:
      const updatedSelectedAnswers = {
        ...state.selectedAnswers,
        [state.currentQuestionIndex]: action.answer,
      };

      const updatedAnsweredQuestions = Object.keys(updatedSelectedAnswers + 1)
        .map(Number)
        .filter(
          (questionIndex) => updatedSelectedAnswers[questionIndex] !== undefined
        );

      return {
        ...state,
        selectedAnswers: updatedSelectedAnswers,
        answeredQuestions: updatedAnsweredQuestions,
      };

    case CBT_ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case CBT_ACTIONS.PREV_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };

    case CBT_ACTIONS.CALCULATE_SCORE:
      // Calculate the score based on selected answers
      const { questions } = action.subjectData;
      let score = 0;

      for (let i = 0; i < questions.length; i++) {
        const correctOption = questions[i].correctOption;
        if (state.selectedAnswers[i] === correctOption) {
          score++;
        }
      }

      return {
        ...state,
        score,
      };

    case CBT_ACTIONS.SET_TIMER:
      return {
        ...state,
        timer: {
          initialTime: action.initialTime,
          timeLeft: action.initialTime,
        },
      };

    case CBT_ACTIONS.START_CBT:
      return {
        ...state,
        cbtStarted: true,
      };

    default:
      return state;
  }
}
// CBT Context Provider Component
export function CBTProvider({ children }) {
  const [state, dispatch] = useReducer(cbtReducer, initialState);

  // Timer logic using useEffect
  useEffect(() => {
    if (state.timer.timeLeft > 0) {
      const timerInterval = setInterval(() => {
        dispatch({
          type: CBT_ACTIONS.SET_TIMER,
          initialTime: state.timer.initialTime - 1,
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [state.timer]);

  return (
    <CBTContext.Provider value={{ state, dispatch }}>
      {children}
    </CBTContext.Provider>
  );
}

// Custom hook to access the CBT context
export function useCBT() {
  const context = useContext(CBTContext);
  if (!context) {
    throw Error("useCBT must be used within a CBTProvider");
  }
  return context;
}

// Export the CBTContext, CBTProvider, and useCBT
export { CBTContext };
