const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log('state on ', state) 
  switch (action.type) {
    case 'GOOD':
      const kopioGood = {...state, good: state.good+1}
      return kopioGood
    case 'OK':
      const kopioOK = {...state, ok: state.ok + 1}
      return kopioOK
    case 'BAD':
      const kopioBAD = {...state, bad: state.bad + 1}
      return kopioBAD
    case 'ZERO':
      const kopio0 = {...state, good: 0, ok: 0, bad: 0}
      return kopio0
    default: return state
  }

}

export default counterReducer