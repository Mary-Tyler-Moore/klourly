import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import './styles/room.css';

import Back from '../dashboard/Back';
import Checkin from './Checkin';
import Announcements from './announcements/Announcements';
import Times from './Times';
import Location from './location/Location';
import Menu from './Menu';
import OwnerAvatar from './OwnerAvatar';
import Header from './Header';


class Room extends Component {
    constructor(props) {
        super(props);
    }

    renderCover() {
        return (
            <div id="room-cover" className="col s12">
                {this.renderAdmin()}
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage={`${this.props.activeRoom.cover}`}
                    bgImageAlt={`${this.props.activeRoom.name} cover image`} 
                    strength={200}
                    renderLayer={percentage => (
                        <div
                            style={{
                                position: 'absolute',
                                background: `linear-gradient(to right,
                                rgba(118, 0, 255, ${percentage * 1.5}),
                                rgb(141, 58, 235, ${percentage * 1}))`,
                                left: '0%',
                                top: '0%',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    )}
                >
                    <div style={{ height: '300px' }} />
                </Parallax>
                <Header 
                    location={this.props.activeRoom.location.name} 
                    name={this.props.activeRoom.name}
                    owner={this.props.activeRoom.owner.name}
                />
                <OwnerAvatar url={this.props.activeRoom.owner.photoUrl} />
            </div>
        )
    }

    renderAdmin() {
        if (this.props.activeRoom.owner.id === this.props.userID) {
            return <Menu id={this.props.activeRoom.id}/>
        }

        return null;
    }

    renderCheckin() {
        if (this.props.activeRoom.owner.id !== this.props.userID) {
            return (
                <div className="col s12 room-aside-section">
                    <Checkin />
                </div>
            )
        }

        return null;
    }

    renderRoom() {

        if (this.props.activeRoom.id === this.props.match.params.roomID) {
            return (
                <div id="room-cont" className="animated fadeIn">
                    {this.renderCover()}
                    <div className="row room-flex-s">
                        <div id="room-main" className="col l8 m6 s12">
                            <Announcements announcements={this.props.activeRoom.announcements}/>
                        </div>
                        <div id="room-aside" className="col l4 m6 s12">
                            {this.renderCheckin()}
                            <div className="col s12 room-aside-section">
                                <Times />
                            </div>
                            <div className="col s12 room-aside-section">
                                <Location />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return null;
    }

    render() {
        return (
            <div id="room" className="container">
                <Back to={'Dashboard'} roomID={this.props.activeRoom.id} />
                {this.renderRoom()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeRoom: state.room.activeRoom,
        loaded: state.room.loaded,
        userID: state.auth.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
