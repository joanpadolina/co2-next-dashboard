export const addCharge = (results) => {
  return {
    type: 'ADD_CHARGE',
    payload: results
  }
}

export const addGimmicks = (results) => {
  return {
    type: 'ADD_GIMMICKS',
    payload: results
  }
}

export const addTotal = (results) => {
  return {
    type: 'ADD_TOTAL',
    payload: results
  }
}

export const user = (results) => {
  return {
    type: 'USER',
    payload: results
  }
}

export const communityUser = (results) => {
  return {
    type: 'COMMUNITY_USERS',
    payload: results
  }
}

export const modalActive = (results) => {
  return {
    type: 'IS_OPEN',
    payload: results
  }
}

export const communitySavings = (results) => {
  return {
    type: 'ADD_COMMUNITY_TOTAL',
    payload: results
  }
}

export async function fetchCommunityUser(dispatch) {
  const community = await fetch('/mock-api/communitySavings.json')
  const response = await community.json()
  dispatch({ type: 'COMMUNITY_USERS', payload: response.community })
}

export async function fetchUser(dispatch) {
  const users = await fetch('/mock-api/user.json')
  const response = await users.json()
  dispatch({ type: 'USER', payload: response })
}
