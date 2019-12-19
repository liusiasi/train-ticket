import './App.css';
import { connect } from 'react-redux';
import React from 'react';
function App(props) {
  return (
    <div></div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch};
  },
)(App);