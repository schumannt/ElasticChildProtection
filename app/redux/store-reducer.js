import { UPDATE_FIELDS, CLEAR_FIELDS } from './store-action';

import fieldMap from './../pages/Components/homePage/fieldMap.json';

export const getDefaultStateFromProps = () => {
  return {
    fieldMap
  };
};

export default function store(state = getDefaultStateFromProps(), {type, payload} = {}) {
  switch (type) {
    case UPDATE_FIELDS:
      return {...state, fieldMap: payload.fieldMap};
    case CLEAR_FIELDS:
      return state;
    default:
      return state;
  }
}