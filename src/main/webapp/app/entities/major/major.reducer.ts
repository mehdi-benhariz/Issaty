import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMajor, defaultValue } from 'app/shared/model/major.model';

export const ACTION_TYPES = {
  FETCH_MAJOR_LIST: 'major/FETCH_MAJOR_LIST',
  FETCH_MAJOR: 'major/FETCH_MAJOR',
  CREATE_MAJOR: 'major/CREATE_MAJOR',
  UPDATE_MAJOR: 'major/UPDATE_MAJOR',
  PARTIAL_UPDATE_MAJOR: 'major/PARTIAL_UPDATE_MAJOR',
  DELETE_MAJOR: 'major/DELETE_MAJOR',
  RESET: 'major/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMajor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MajorState = Readonly<typeof initialState>;

// Reducer

export default (state: MajorState = initialState, action): MajorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MAJOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MAJOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MAJOR):
    case REQUEST(ACTION_TYPES.UPDATE_MAJOR):
    case REQUEST(ACTION_TYPES.DELETE_MAJOR):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_MAJOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MAJOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MAJOR):
    case FAILURE(ACTION_TYPES.CREATE_MAJOR):
    case FAILURE(ACTION_TYPES.UPDATE_MAJOR):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_MAJOR):
    case FAILURE(ACTION_TYPES.DELETE_MAJOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAJOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAJOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MAJOR):
    case SUCCESS(ACTION_TYPES.UPDATE_MAJOR):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_MAJOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MAJOR):
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

const apiUrl = 'api/majors';

// Actions

export const getEntities: ICrudGetAllAction<IMajor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MAJOR_LIST,
  payload: axios.get<IMajor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMajor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MAJOR,
    payload: axios.get<IMajor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMajor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MAJOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMajor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MAJOR,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IMajor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_MAJOR,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMajor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MAJOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
