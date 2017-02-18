
export function resetFields() {
  return {
    type: 'CLEAR_FIELDS'
  };
}

export const updateFields = newInput => ({
  type: 'UPDATE_FIELDS',
  payload: {
    inputValues: newInput,
  }
});
