import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions'
import { logout, getCurrentUser } from '../../actions/session_actions';
import Greeting from './greeting';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUser()),
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Greeting);