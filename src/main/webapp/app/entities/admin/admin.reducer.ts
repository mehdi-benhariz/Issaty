import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAdmin, defaultValue } from 'app/shared/model/admin.model';

export const ACTION_TYPES = {
  FETCH_ADMIN_LIST: 'admin/FETCH_ADMIN_LIST',
  FETCH_ADMIN: 'admin/FETCH_ADMIN',
  CREATE_ADMIN: 'admin/CREATE_ADMIN',
  UPDATE_ADMIN: 'admin/UPDATE_ADMIN',
  PARTIAL_UPDATE_ADMIN: 'admin/PARTIAL_UPDATE_ADMIN',
  DELETE_ADMIN: 'admin/DELETE_ADMIN',
  RESET: 'admin/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAdmin>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AdminState = Readonly<typeof initialState>;

// Reducer

export default (state: AdminState = initialState, action): AdminState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ADMIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ADMIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ADMIN):
    case REQUEST(ACTION_TYPES.UPDATE_ADMIN):
    case REQUEST(ACTION_TYPES.DELETE_ADMIN):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_ADMIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ADMIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ADMIN):
    case FAILURE(ACTION_TYPES.CREATE_ADMIN):
    case FAILURE(ACTION_TYPES.UPDATE_ADMIN):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_ADMIN):
    case FAILURE(ACTION_TYPES.DELETE_ADMIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADMIN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ADMIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ADMIN):
    case SUCCESS(ACTION_TYPES.UPDATE_ADMIN):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_ADMIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ADMIN):
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

const apiUrl = 'api/admins';

// Actions

export const getEntities: ICrudGetAllAction<IAdmin> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ADMIN_LIST,
  payload: axios.get<IAdmin>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAdmin> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ADMIN,
    payload: axios.get<IAdmin>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAdmin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ADMIN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAdmin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ADMIN,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IAdmin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_ADMIN,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAdmin> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ADMIN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
