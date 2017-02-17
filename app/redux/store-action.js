import { UPDATE_FIELDS, CLEAR_FIELDS }  from './store-reducer';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }

export const updateFields = (newFieldMap) => {
  return {
    type: UPDATE_FIELDS,
    payload: {
      fieldMap: newFieldMap,
    }
  };
};