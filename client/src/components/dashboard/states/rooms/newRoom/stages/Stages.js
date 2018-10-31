import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { ToastContainer, Flip } from 'react-toastify';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newRoomCreatedAction } from '../../../../../../actions/newRoom/newRoomCreatedAction';
import { enterRoomActions } from '../../../../../../actions/enterRoomActions';
import { nextStageAction } from '../../../../../../actions/newRoom/nextStageAction';

import 'react-toastify/dist/ReactToastify.css';

import { dashboard } from '../../../../../middelware/dashboard';
import { cards } from '../../../../../../helpers/cards';

import BackToDash from '../../../../BackToDash';

// stages
import Intro from './Intro';
import Name from './Name';
import Type from './Type';
import Purpose from './Purpose';
import Radius from './Radius';
import Location from './Location';
import Times from './Times';

let WORDS = [];

///////////////////////////////////////////////////////////////////////
//////// THIS FILE WILL BE REFACTORED AFTER INITIAL CODEBASE  ////////
///////     EACH STAGE SPLIT INTO OWN COMPONENT AND STATE    ////////
////////////////////////////////////////////////////////////////////


class Stages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: WORDS[Math.floor(Math.random() * WORDS.length)],
            newRoomSuccess: {},
            owner: this.props.state.auth.user.id,
            stage: this.props.state.dashboard.newRoom ? this.props.state.dashboard.newRoom.stage : 6,
            lastStage: 7,
            validTimes: false,
            validWeek: false,
            startWeek: false,
            daysSelected: 0,
            dayTimes: [],
            repeat: true,
            cover: null,
        }

        this.createRoom = this.createRoom.bind(this);
        this.currentStage = this.currentStage.bind(this);
        this.displayStageStatus = this.displayStageStatus.bind(this);
        this.renderStage = this.renderStage.bind(this);
        this.setCoverPreview = this.setCoverPreview.bind(this);
        this.renderBackToDash = this.renderBackToDash.bind(this);
        this.setStage = this.setStage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.displayCoverFileName = this.displayCoverFileName.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);

    }

    // update words when component renders
    componentWillMount() {
        WORDS = ['Awesome', 'Cool', 'Great', 'Nice', 'Sweet', 'Good Job', 'Magnificent', 'Incredible'];
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props.state.dashboard.newRoom) {
            if (this.props.state.dashboard.newRoom.stage !== nextProps.state.dashboard.newRoom.stage) {
                this.setState({
                    stage: nextProps.state.dashboard.newRoom.stage
                })
            }
        }

        else {
            this.props.nextStageAction({
                stage: 5,
                lastStage: 7
            });
        }
        
    }

    renderBackToDash() {
        return this.state.stage < 8 ? <BackToDash /> : null;
    }

    displayStageStatus() {

        let stageMessage = '';
        switch (this.state.stage) {
            case 1:
                stageMessage = 'Lets start by giving your room a fitting name...';
                break;

            case 2:
                stageMessage = 'I want the room to be...';
                break;

            case 3:
                stageMessage = 'The room will be used for...';
                break;

            case 4:
                stageMessage = 'Authorized users can check into the room within...';
                break;

            case 5:
                stageMessage = 'Whats the location the will the room be held...';
                break;

            case 6:
                stageMessage = 'The room will be active for users during...';
                break;
            
            case 7:
                stageMessage = 'Lets finish by adding a fitting cover image to the room...';
                break;
        }

        const STATUS = 
        <div className="animated fadeIn">
            <h5>{`${this.state.word}! ${stageMessage}`}</h5>
        </div>


        return this.state.stage < 1 || this.state.stage > 6 ? null : STATUS;
    }

    setStage() {
        
        WORDS.splice(WORDS.indexOf(this.state.word), 1);
        this.setState({
            word: WORDS[Math.floor(Math.random() * WORDS.length)],
            stage: this.state.stage + 1
        });
    }

    stageSeven() {
        const STAGE_SEVEN =
        <div className="row col s12">
            <div className="col s6">
                <Dropzone id="new-room-cover-upload" onDrop={this.onDrop} onDragEnter={(event) => this.onDragEnter(event)} onDragLeave={this.onDragLeave} accept="image/jpeg, image/png" multiple={false}>
                    <h4>Drag files here</h4>
                    <h5>or</h5>
                    <button id="new-room-cover-browse" className="waves-effect waves-light btn animated fadeIn">Browse</button>
                </Dropzone>
            </div>
            <div id="cover-preview" className="col s6">
                <img src={this.setCoverPreview()} alt={this.displayCoverFileName()} className="z-depth-2" />
            </div>
            <div id="finish-room-creation-cont" className="col s12">
                <button id="confirm-new-room-name" className="waves-effect waves-light btn animated fadeIn" onClick={this.setStage}>Finish and create room</button>
                <p>Default cover image will be selected if no other image is uploaded</p>
            </div>
        </div>

        return STAGE_SEVEN;
    }

    setCoverPreview() {
        return this.state.cover ? this.state.cover[0].preview : '../img/dashboard/cover.jpg';
    }

    displayCoverFileName() {
        const file = this.state.cover;
        const FILE_NAME =
        <div className="animated fadeIn">
            <h5 id="new-room-cover-file-name">{file === null ? '' : file[0].name}</h5>
        </div>

        return this.state.cover === null ? null : FILE_NAME;
    }

    onDrop(file) {
        this.setState({
            cover: file
        });
        document.querySelector('#new-room-cover-upload').className = 'col s6';
        console.log(file);
    }

    onDragEnter(e) {
        const ele = e.target;
        ele.id === 'new-room-cover-upload' ? ele.className = 'col s12 dropzone-active' : null;
    }

    onDragLeave() {
        document.querySelector('#new-room-cover-upload').className = 'col s12';
    }

    currentStage() {
        switch (this.state.stage) {

            case 1:
                return <Name />;

            case 2:
                return <Type />;

            case 3:
                return <Purpose />;
            
            case 4:
                return <Radius />;

            case 5:
                return <Location />;

            case 6:
                return <Times />;
            
            case 7:
                return this.STAGE_SEVEN();

            case 8:
                return this.createRoom();

            default:
                return null;
        }
    }

    createRoom() {
        const roomData = {
            owner: this.state.owner,
            name: this.state.roomName,
            type: this.state.roomType,
            purpose: this.state.roomPurpose,
            radius: this.state.roomRadius,
            times: this.state.dayTimes,
            startWeek: this.state.startWeek,
            repeat: this.state.repeat,
            cover: this.state.cover
        }
        
        dashboard.createRoom(this.props.state.user.id, JSON.stringify(roomData))
        .then(response => {
            this.setStage();
            this.props.newRoomActions(response.data.rooms);
            localStorage.setItem('rooms', 
            JSON.stringify({
                ...response.data.rooms
            }));

            cards.enterRoom(this.props, response.data.id);
        });

        return <p className="redirecting">Successfully created room! Redirecting...</p>;
    }

    renderStage() {
        const STAGE = 
        <div id="new-room-stage-cont" className="col s10 offset-s1">
            {this.currentStage()}
        </div>

        return STAGE;
    }

    render() {
        return (
            <div>
                {this.renderBackToDash()}
                <div className="no-select row">
                    <Intro />
                    <div id="current-stage-status" className="col s8 offset-s2">
                        {this.displayStageStatus()}
                    </div>
                    {this.renderStage()}
                    <ToastContainer 
                        transition={Flip}
                        closeButton={false}
                    />
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction, newRoomCreatedAction, enterRoomActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stages);