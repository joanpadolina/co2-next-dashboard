const initialState = {
    isOpen: false,
    user: {},
    chargingSession: [
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
    forecast: {},
    community: {
        savingGoals: [100,200,300,400,500],
        total: Number,
    },
    gimmicks: [],
    total: Number,
  };

  export default initialState