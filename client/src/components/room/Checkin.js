import React, { Component } from 'react';
import styled from 'styled-components';
import { attendence } from '../../api/room/attendence';
import { format } from '../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomAttendenceAction } from '../../actions/room/attendence/setRoomAttendenceAction';
import { checkinAvailableAction } from '../../actions/room/checkin/checkinAvailableAction';

import Attendence from './Attendence';


class Checkin extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    registerAttendence = async () => {

        // disable button while performing request
        this.setState({ loading: true });

        // attempt to register attendence
        const response = await attendence.registerAttendence(
                        this.props.userID, this.props.activeRoomID);

        if (response.data.success) {

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.activeRoomID,
                checkinData: false
            });

            // update users attendence percentage for room
            console.log(this.props.attendence);
            const updatedTotal = this.props.attendence.totalUserCheckinsForRoom + 1;
            this.props.setRoomAttendenceAction({
                roomID: this.props.activeRoomID,
                attendenceData: {
                    ...this.props.attendence,
                    totalUserCheckinsForRoom: updatedTotal,
                    attendenceInPercentage: format.getPercentage(
                        updatedTotal,
                        this.props.attendence.totalRoomCheckins
                    )
                }
            });
        } 

        // finish loading
        this.setState({ loading: false });
    }

    renderCheckinBtn() {

        const available = this.props.availableForCheckin && this.props.availableForCheckin.active;

        return (
            <div>
                <StyledButton 
                    className="waves-effect waves-light btn animated fadeIn"
                    disabled={available ? false : true || this.state.loading}
                    onClick={this.registerAttendence}
                >
                    {available ? 'Checkin' : 'Unavailable'}
                </StyledButton>
            </div>
        )
    }

    render() {
        return (
            <CheckinCont className="col s12">
                <Attendence />
                {this.renderCheckinBtn()}
            </CheckinCont>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeRoomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        availableForCheckin: state.room.availableForCheckin[state.room.activeRoom.id],
        attendence: state.room.attendence[state.room.activeRoom.id]
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setRoomAttendenceAction,
        checkinAvailableAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);


const CheckinCont = styled.div`
    text-align: center;
    margin-bottom: 3.5rem;
`;

const StyledButton = styled.a`
    color: #ffffff;
    background-color: #12e2a3;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    line-height: 0;
    letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 600;
    padding: 1.75rem;
    display: block;
    max-width: 70%;
    margin: 2rem auto 0 auto;
    clear: both;

    &:hover {
        box-shadow: 0px 18px 56px rgba(0,0,0,0.15);
        background-color: #12e2a3;
    }
`;


