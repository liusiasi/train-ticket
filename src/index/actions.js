export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_ISCITYSELECTORVISIBLE = 'SET_ISCITYSELECTORVISIBLE';
export const ACTION_SET_CURRENTSELECTIONLEFTCITY = 'SET_CURRENTSELECTIONLEFTCITY';
export const ACTION_SET_CITYDATA = 'SET_CITYDATA';
export const ACTION_SET_ISLOADINGCITYDATA = 'SET_ISLOADINGCITYDATA';
export const ACTION_SET_ISDATESELECTORVISIBLE = 'SET_ISDATESELECTORVISIBLE';
export const ACTION_SET_HIGHSPEED = 'SET_HIGHSPEED';
export const ACTION_SET_DEPARTDATE = 'SET_DEPARDATE';

export function setFrom(from){
  return {
    type: ACTION_SET_FROM,
    payload: from,
  };
}
export function setTo (to){
  return {
    type: ACTION_SET_TO,
    payload: to,
  };
}
export function setLoadingCityData (isLoadingCityData){
  return {
    type: ACTION_SET_ISLOADINGCITYDATA,
    payload: isLoadingCityData,
  };
}
export function setCityData (cityData){
  return {
    type: ACTION_SET_CITYDATA,
    payload: cityData,
  };
}
export function toggleHighSpeed (){
  return (dispatch, getState ) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGHSPEED,
      payload: !highSpeed,
    })
  };
}

export function setDepartDate(departdate){
  return {
    type: ACTION_SET_DEPARTDATE,
    payload: departdate,
  };
}

export function showCitySelector(currentSelectingLeftCity) {
  console.log("showCitySelector");
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_ISCITYSELECTORVISIBLE,
      payload: true,
    });

    dispatch({
      type: ACTION_SET_CURRENTSELECTIONLEFTCITY,
      payload: currentSelectingLeftCity,
    });

  }
}

export function hideCitySelector() {
  return  {
      type: ACTION_SET_ISCITYSELECTORVISIBLE,
      payload: false,
  }
}

export function setSelectedCity(city) {                                                 
  return (dispatch, getState) => {
    const { currentSelectionLeftCity } = getState();
    if( currentSelectionLeftCity ){
      dispatch(setFrom(city));
      dispatch(hideCitySelector());
    }else{
      dispatch(setTo(city));
      dispatch(hideCitySelector());
    }
  }
}
export function showDateSelector() {
  return {
    type : ACTION_SET_ISDATESELECTORVISIBLE,
    payload: true,
  }
}

export function hideDateSelector() {
  return {
    type : ACTION_SET_ISDATESELECTORVISIBLE,
    payload: false,
  }
}

export function exchangeFromTo() {
  return (dispatch, getState ) => {
    const { from , to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  }
}

export function fetchCityData() {
  return (dispatch, getState ) =>{
    const { isLoadingCityData } = getState();
    if(isLoadingCityData){
      return ;
    }

    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

    if (Date.now() < cache.expires) {
        dispatch(setCityData(cache.data));
        console.log('train');
        return;
    }

    dispatch(setLoadingCityData(true));
    fetch('/rest/cities?_'+Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData));
        console.log(cityData);
        localStorage.setItem(
            'city_data_cache',
            JSON.stringify({
                expires: Date.now() + 60 * 1000,
                data: cityData,
            }),
        );
      dispatch(setLoadingCityData(false));

      })
      .catch(err => {
        dispatch(setLoadingCityData(false));
      })
  }
}




