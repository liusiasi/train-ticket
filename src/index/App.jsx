import React,{
  useMemo,
  useCallback,
} from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  bindActionCreators,
} from 'redux'
import Header from '../common/Header.jsx';
import Journey from './Journey.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Submit from './Submit.jsx';
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from './actions';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector.jsx';
import { h0 } from '../common/fp';

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible,
    highSpeed
  } = props;

  const onBack = useCallback(()=>{
    window.history.back();
  },[]);

  const cbs = useMemo( () => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector,
    }, dispatch)
  },[]);

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
          onBack: hideCitySelector,
          fetchCityData,
          onSelect:setSelectedCity
      }, dispatch);
  }, []);

  const departDateCbs = useMemo(() => {
    return bindActionCreators({
        onClick: showDateSelector,
    }, dispatch);
  }, []);

  const dateSelectorCbs = useMemo(() => {
      return bindActionCreators({
          onBack: hideDateSelector,
      }, dispatch);
  }, []);

  const onSelectDate = useCallback((day) => {
      if (!day) {
          return;
      }

      if (day < h0()) {
          return;
      }

      dispatch(setDepartDate(day));
      dispatch(hideDateSelector())
  }, []);
  const highSpeedCbs = useMemo(() => {
      return bindActionCreators({
          toggle: toggleHighSpeed,
      }, dispatch);
  }, []);
  return(
    <div>
      <div className="header-wrapper">

        <Header onBack={onBack} title="火车票"/>
      </div>
      <form action="./query.html" className="form">

          <Journey from={from} to={to} {...cbs}/>
          <DepartDate 
            time={departDate}
            {...departDateCbs}
          />
          <HighSpeed
            highSpeed={highSpeed}
            {...highSpeedCbs}
          />
          <Submit/>
      </form>

      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
            show={isDateSelectorVisible}
            {...dateSelectorCbs}
            onSelect={onSelectDate}
        />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  },
)(App);