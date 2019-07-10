const INITIAL_STATE = []

export default async (state = INITIAL_STATE, action) => {
    if (action.type === 'ADD_ESTABLISHMENT') {
        const { establishment } = action
        return await { establishment }
    } else {
        return state
    }
}