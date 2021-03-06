import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openAnnouncementAction } from '../../../actions/room/announcement/openAnnouncementAction';

import Reactions from './reactions/Reactions';
import BackToRoom from '../BackToRoom';
import AnnouncementPoll from './AnnouncementPoll';
import Comments from './comments/Comments';
import CircularLoader from '../../loaders/CircularLoader';

class Announcement extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => window.scrollTo(0, 0);

    componentDidMount() {

        // update active annoucement
        if (this.props.announcement) this.props.openAnnouncementAction(this.props.announcement);
    }

    renderAnnouncement() {

        if (this.props.announcement) {
            return (
                <StyledAnnouncement className="animated fadeIn col s12 m10 offset-m1 l10 offset-l1">
                    <div className="announcement">
                        <h1>{this.props.announcement.title}</h1>
                        <h5>{format.getFormatedDateAndTime(this.props.announcement.timestamp)}</h5>
                        <p>{this.props.announcement.message}</p>
                        <Reactions announcementID={this.props.announcementID} />
                    </div>
                    <div className="row">
                        <div className="col s12">
                            {this.renderPoll()}
                        </div>
                    </div>
                    <Comments announcementID={this.props.announcementID} />
                </StyledAnnouncement>
            )
        }

        return <CircularLoader size="big" />
    }

    renderPoll() {

        if (!this.props.announcement.poll) return null;

        return <AnnouncementPoll 
                    announcementID={this.props.announcementID}
                    roomID={this.props.roomID}
                />
    }


    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    {this.renderAnnouncement()}
                </div>
            </main>
        )
    }
}


const mapStateToProps = (state, compProps) => {
    return {
        roomID: compProps.match.params.roomID,
        announcementID: compProps.match.params.announcementID,
        announcement: state.room.activeRoom.announcements 
        ? state.room.activeRoom.announcements[compProps.match.params.announcementID]
        : null
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ openAnnouncementAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);


const StyledAnnouncement = styled.section`

    background-color: #ffffff;
    box-shadow: 0px 9px 28px rgba(0,0,0,0.09);
    padding: 5rem !important;
    margin-bottom: 5rem;
    border-radius: 18px;

    .announcement {
        h1 {
            font-size: 2.25rem;
            text-align: center;
            font-weight: 800;
            margin-top: 0;
        }

        h5 {
            color: #bdbdbd;
            text-align: center;
            font-size: 1.25rem;
            margin-bottom: 3rem;
        }

        p {
            clear: both;
            min-width: 100%;
            padding: 3rem 0 2rem 0;
            border-top: 1px solid #eeeeee;
            color: #757575;
            font-weight: 400;
        }
    }

    @media screen and (max-width: 600px) {
        padding: 3rem !important;

        .announcement {
            h1 {
                margin-top: 2rem;
                font-size: 1.75rem;
            }

            h5 {
                font-size: 1rem;
            }
        }
    }
`;
