import React, { Component } from 'react';
import styled from 'styled-components';
import RoomReportPreview from './RoomReportPreview';
import Filter from './Filter';
import SelectMemberReport from './SelectMemberReport';
import Pagination from './Pagination';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class RoomReportPreviews extends Component {
    constructor(props) {
        super(props);
    }

    renderReportPreviews() {

        // itterate over checkins and generate preview reports
        return Object.entries(this.props.checkins)
        .reverse().slice((this.props.reportIndex * 8), (this.props.reportIndex * 8) + 8)
        .map(([checkinID, checkinData]) => {

            // filter out attendies not attended
            const attendies = this.props.membersData
                            .filter(member => 
                                checkinData.attendies 
                                ? Object.keys(checkinData.attendies).indexOf(member.id) !== -1
                                : null
                            );

            return <RoomReportPreview 
                        key={checkinID}
                        data={{
                            checkinID,
                            ...checkinData,
                            attendies
                        }} 
                    />
        });
        
    }

    render() {
        return (
            <StyledCont className="row">
                <div className="col s9 report-preview">
                    <Pagination />
                    {this.renderReportPreviews()}
                    <Pagination />
                </div>
                <div className="col s3 aside-menu">
                    <Filter />
                    <SelectMemberReport data={this.props.membersData} />
                </div>
            </StyledCont>
        )
    }
}

const mapStateToProps = state => {
    return { 
        checkins: state.room.activeRoom.checkins,
        reportIndex: state.room.activeRoom.reportIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReportPreviews);

const StyledCont = styled.div`

    .report-preview, .aside-menu {
        padding: 0;
    }
`;
