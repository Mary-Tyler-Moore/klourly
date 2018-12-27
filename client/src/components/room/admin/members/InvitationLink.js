import React, { Component } from 'react';
import { RefreshCw } from 'react-feather';
import styled from 'styled-components';
import { format } from '../../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class InvitationLink extends Component {
    constructor(props) {
        super(props);
    }

    renderLink() {
        const invite = this.props.state.room.activeRoom.invite;
        return (
            <StyledInvite>
                <h4>Invitation Link</h4>
                <h5>{invite.url}</h5>
                <p>Valid from {format.tsToDate(invite.validFrom)} to {format.tsToDate(invite.validTo)}</p>
                {this.renderAvailableBadge(invite.validTo)}<GenerateNewBtn className="waves-effect waves-purple btn-flat"><RefreshCw size={18}/> Generate New</GenerateNewBtn>
            </StyledInvite>
        )
    }

    renderAvailableBadge(validTo) {

        // check if validTo is less than todays time
        if (parseInt(validTo) < new Date().getTime()) {
            return <ExpiredBadge>Expired</ExpiredBadge>
        }

        return <AvailableBadge>Available</AvailableBadge>
    }

    render() {
        return (
            <div className="col s12 m6 l6 animated fadeIn">
                {this.renderLink()}
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationLink);

const StyledInvite = styled.div`

    padding: 2rem;
    box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    background: #7F00FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    h4 {
        color: #ffffff;
        font-weight: 100;
        margin-top: 0;
        opacity: 0.7;
    }

    h5 {
        font-size: 1.35rem;
        color: #ffffff;
        font-weight: 800;
        cursor: pointer;
    }

    p {
        color: #ffffff;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        opacity: 0.7;
    }
`;

const AvailableBadge = styled.span`
    background-color: #66bb6a;
    color: #ffffff;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
`;

const ExpiredBadge = styled.span`
    background-color: #ff5252;
    color: #ffffff;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
`;

const GenerateNewBtn = styled.button`
    font-weight: 600;
    margin-left: 1rem;
    color: #757575;
    background-color: #eeeeee;
    border-radius: 4px;

    &:focus, &:active {
        background-color: #eeeeee;
    }

    svg {
        margin-bottom: -3.5px;
        margin-right: 5px;
    }


`;