export const addCharge = (results) => {
    return {
        type: "ADD_CHARGE",
        payload: results
    }
}

export const addGimmicks = (results) => {
    return {
        type: "ADD_GIMMICKS",
        payload: results
    }
}

export const addTotal = (results) => {
    return {
        type: "ADD_TOTAL",
        payload: results
    }
}

export const user = (results) => {
    return {
        type: "USER",
        payload: results
    }
}

export async function fetchUser(dispatch) {
  const users = await fetch('http://localhost:4000/user');
  const response = await users.json();
  dispatch({ type: 'USER', payload: response });
}