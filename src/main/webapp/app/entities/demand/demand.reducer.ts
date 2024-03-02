import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDemand, defaultValue } from 'app/shared/model/demand.model';

export const ACTION_TYPES = {
  FETCH_DEMAND_LIST: 'demand/FETCH_DEMAND_LIST',
  FETCH_DEMAND: 'demand/FETCH_DEMAND',
  CREATE_DEMAND: 'demand/CREATE_DEMAND',
  UPDATE_DEMAND: 'demand/UPDATE_DEMAND',
  PARTIAL_UPDATE_DEMAND: 'demand/PARTIAL_UPDATE_DEMAND',
  DELETE_DEMAND: 'demand/DELETE_DEMAND',
  RESET: 'demand/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDemand>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type DemandState = Readonly<typeof initialState>;

// Reducer

export default (state: DemandState = initialState, action): DemandState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEMAND_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEMAND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DEMAND):
    case REQUEST(ACTION_TYPES.UPDATE_DEMAND):
    case REQUEST(ACTION_TYPES.DELETE_DEMAND):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_DEMAND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DEMAND_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEMAND):
    case FAILURE(ACTION_TYPES.CREATE_DEMAND):
    case FAILURE(ACTION_TYPES.UPDATE_DEMAND):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_DEMAND):
    case FAILURE(ACTION_TYPES.DELETE_DEMAND):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEMAND_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEMAND):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEMAND):
    case SUCCESS(ACTION_TYPES.UPDATE_DEMAND):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_DEMAND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEMAND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/demands';

// Actions

export const getEntities: ICrudGetAllAction<IDemand> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEMAND_LIST,
  payload: axios.get<IDemand>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDemand> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEMAND,
    payload: axios.get<IDemand>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDemand> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEMAND,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDemand> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEMAND,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IDemand> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_DEMAND,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDemand> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEMAND,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
