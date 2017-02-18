
export function resetFields() {
  return {
    type: "CLEAR_FIELDS"
  };
}

export const updateFields = (newInput) => {
  return {
    type: "UPDATE_FIELDS",
    payload: {
      inputValues: newInput,
    }
  };
};