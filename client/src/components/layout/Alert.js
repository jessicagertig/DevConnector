import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  //the alerts prop (destructured above) is an ARRAY
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    //the className is set up to dynamically take variables, in this case alertType is danger, which creates the styling
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
