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
      savedCarbon: 25
    }
  ],
  forecast: {},
  community: {
    users: [],
    savingGoals: [100, 200, 300, 400, 500],
    total: 0
  },
  gimmicks: [],
  total: Number
}

export default initialState
