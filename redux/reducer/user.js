const initialState = {
  isOpen: false,
  userData: {},
  historyCharge: [
    {
      date: '2021-03-11',
      start: '12:00',
      end: '20:00',
      duration: '08:00',
      savingsInPercentage: '10%',
      savedCarbon: 25,
      totalCarbon: 50,
      totalSavedCarbon: 25,
    },
  ],
  gimmicks: [],
  total: Number,
};

const user = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        userData: data.user,
      };
    case 'ADD_CHARGE':
      return {
        ...state,
        historyCharge: [...state.historyCharge, data],
      };
    case 'ADD_GIMMICKS':
      return {
        ...state,
        gimmicks: [data],
      };
    case 'ADD_TOTAL':
      return {
        ...state,
        total: data,
      };
    case 'IS_OPEN':
      return {
        ...state,
        isOpen: data,
      };
    default:
      return state;
  }
};

export default user;
