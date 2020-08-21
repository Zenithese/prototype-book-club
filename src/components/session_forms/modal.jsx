import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { AuthRoute } from '../../util/route_util';
import LoginFormContainer from "./login_form_container";
import SignupFormContainer from './signup_form_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'login':
            component = <AuthRoute exact path="/" component={LoginFormContainer} />
            break;
        case 'signup':
            component = <AuthRoute exact path="/" component={SignupFormContainer} />
            break;
        default:
            return null;
    }
    
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const msp = state => {
    return {
        modal: state.ui.modal,
    };
};

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(msp, mdp)(Modal);