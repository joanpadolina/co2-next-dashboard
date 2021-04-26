import initialState from './initState'

const store = (state = initialState, action) => {
  const data = action.payload
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        user: data.user
      }
    case 'ADD_CHARGE':
      return {
        ...state,
        chargingSession: [...state.chargingSession, data]
      }
    case 'ADD_GIMMICKS':
      return {
        ...state,
        gimmicks: [data]
      }
    case 'ADD_TOTAL':
      return {
        ...state,
        total: data
      }
    case 'IS_OPEN':
      return {
        ...state,
        isOpen: data
      }
    case 'COMMUNITY_USERS':
      return {
        ...state,
        community: {
          ...state.community,
          users: [...data]
        }
      }
    case 'ADD_COMMUNITY_TOTAL':
      return {
        ...state,
        community: {
          ...state.community,
          total: data
        }
      }
    default:
      return state
  }
}

export default store
