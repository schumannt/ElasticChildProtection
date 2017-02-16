// export const UPDATE_CANCEL_URL = 'filter:update-cancel-url';
// export const UPDATE_CURRENT_URL = 'filter:update-current-url';
// export const UPDATING_START = 'filter:updating-start';
// export const UPDATING_STOP = 'filter:updating-stop';
// export const UPDATE_FILTERS = 'filter:update-filters';
// export const UPDATE_FACETS = 'filter:update-facets';
import fieldMap from './fieldMap.json';

export const getDefaultStateFromProps = state => {
  return {
    fieldMap
  };
};

export default function redux(state = {}, {type, payload} = {}) {
  switch (type) {
    // case UPDATE_CANCEL_URL:
    //   return {...state, cancelUrl: payload.cancelUrl};
    // case UPDATE_CURRENT_URL:
    //   return {...state, currentUrl: payload.currentUrl};
    // case UPDATING_START:
    //   return {...state, isUpdating: true};
    // case UPDATING_STOP:
    //   return {...state, isUpdating: false};
    // case UPDATE_FILTERS:
    //   return {...state, currentFilters: payload.filters};
    // case UPDATE_FACETS:
    //   return {...state, facets: payload.facets};
    default: return state;
  }
}
