import { combineReducers } from 'redux';


/*
|--------------------------------------------------------------------------
|  scan
|--------------------------------------------------------------------------
|
*/
const scanReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_KEYS': 
            return action.payload;
        case 'RESET_SCAN_RESULT': 
            return action.payload;
        default :
            return state;
    }
}

export const parseScanResult = url => dispatch => {
    const scanPathParts = url ? url.split('/') : [];
    const placeId = scanPathParts.length > 2 ? scanPathParts[scanPathParts.length - 2] : null;
    const codeId = scanPathParts.length > 2 ? scanPathParts[scanPathParts.length - 1] : null;

    const data = { placeId, codeId };

    dispatch({ type: 'SET_KEYS', payload: data });
}

export const resetScanResult = () => dispatch => {
    dispatch({ type: 'RESET_SCAN_RESULT', payload: null });
}


/*
|--------------------------------------------------------------------------
|  place & menu
|--------------------------------------------------------------------------
|
*/
const placeReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_PLACE': 
            return action.payload;
        case 'RESET_PLACE': 
            return action.payload;
        default :
            return state;
    }
}
export const setPlace = (place, placeId, codeId) => dispatch => {
    place.placeId = placeId;
    place.codeId = codeId;
    dispatch({ type: 'SET_PLACE', payload: place });
}

export const resetPlace = () => dispatch => {
    dispatch({ type: 'RESET_PLACE', payload: null });
}


/*
|--------------------------------------------------------------------------
|  place fetch error
|--------------------------------------------------------------------------
|
*/
const placeFetchErrorReducer = (state = false, action) => {
    switch(action.type) {
        case 'SET_PLACE_FETCH_ERROR': 
            return action.payload;
        default :
            return state;
    }
}

export const setPlaceFetchError = val => dispatch => {
    dispatch({ type: 'SET_PLACE_FETCH_ERROR', payload: val });
}



/*
|--------------------------------------------------------------------------
|  STATE
|--------------------------------------------------------------------------
|
*/
export const reducers = combineReducers({
  scanResult: scanReducer,
  place: placeReducer,
  placeFetchError: placeFetchErrorReducer
});