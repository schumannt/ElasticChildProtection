export default function InputReducer(state = {}, { type, payload } = {}) {
  
  const UPDATE_FIELDS = 'UPDATE_FIELDS';
  const CLEAR_FIELDS = 'CLEAR_FIELDS';
  
  switch (type) {
    case UPDATE_FIELDS:
      const oldFields = state.inputValues;
      const newFields = payload.inputValues;
      const updatedFields = { ...oldFields, ...newFields };
      return { ...state, inputValues: updatedFields };
    case CLEAR_FIELDS:
      return { ...state, inputValues: {} };
    default:
      return state;
  }
}
