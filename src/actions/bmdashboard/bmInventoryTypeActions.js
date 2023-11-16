import axios from "axios";

import { ENDPOINTS } from "utils/URL";
import { FETCH_BUILDING_MATERIAL_INVENTORY_TYPES } from "constants/bmdashboard/materialsConstants";
import { GET_ERRORS } from "constants/errors";

export const fetchAllBuildingInventoryMaterialTypes = () => {
  return async dispatch => {
    axios.get(ENDPOINTS.BM_BUILDING_INVENTORY_TYPES)
      .then(res => {
        dispatch(setBuildingInventoryTypes(res.data))
      })
      .catch(err => {
        dispatch(setErrors(err))
      })
  }
}

export const setBuildingInventoryTypes = payload => {
  return {
    type: FETCH_BUILDING_MATERIAL_INVENTORY_TYPES,
    payload
  }
}

export const setErrors = payload => {
  return {
    type: GET_ERRORS,
    payload
  }
}