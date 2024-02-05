import {
  SET_CONSUMABLES, RESET_UPDATE_CONSUMABLE_BULK, POST_UPDATE_CONSUMABLE_START_BULK, POST_UPDATE_CONSUMABLE_END_BULK, POST_UPDATE_CONSUMABLE_ERROR_BULK
} from "constants/bmdashboard/consumableConstants"

const defaultState = {
  consumableslist: [],
  updateConsumables: {
    loading: false,
    result: null,
    error: undefined
  },
  updateConsumablesBulk: {
    loading: false,
    result: null,
    error: undefined
  }
}
//TODO: should be like bmconsumables.consumableslist
export const consumablesReducer = (consumables = defaultState, action) => {
  switch (action.type) {
    case SET_CONSUMABLES:
      {
        consumables.consumableslist = action.payload;
        return {
          ...consumables, updateConsumables: { ...defaultState.updateConsumables },
          updateConsumablesBulk: { ...defaultState.updateConsumablesBulk }
        }
      }
    case POST_UPDATE_CONSUMABLE_START_BULK:
      {
        const obj = { loading: true }
        consumables.updateConsumablesBulk = obj;
        return { ...consumables }
      }
    case POST_UPDATE_CONSUMABLE_END_BULK:
      {
        const obj = { result: action.payload, loading: false, error: false }
        consumables.updateConsumablesBulk = obj;
        return { ...consumables }
      }

    case POST_UPDATE_CONSUMABLE_ERROR_BULK:
      {
        const obj = { result: action.payload, loading: false, error: true }
        consumables.updateConsumablesBulk = obj;
        return { ...consumables }
      }
    case RESET_UPDATE_CONSUMABLE_BULK:
      {
        const obj = { loading: false, result: null, error: undefined }
        consumables.updateConsumablesBulk = obj;
        return { ...consumables }
      }
    default:
      return consumables;
  }
}