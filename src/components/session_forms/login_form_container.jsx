import { connect } from 'react-redux';
import React from 'react';
import { login } from '../../actions/session_actions';
import {  openModal, closeModal } from '../../actions/modal_actions'
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    // errors: errors.session,
    formType: 'login',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: (
      <div onClick={() => dispatch(openModal("signup"))}>
        Signup instead
      </div>
    ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);