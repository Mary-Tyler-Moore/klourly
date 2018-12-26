import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const room = {
    createRoom,
    getRoom,
    getRooms,
    publishAnnouncement
}

// create new room
async function createRoom(uid, data) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/createRoom',
            data: {
                uid,
                room: data
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
} 

// get room data for a specific room
async function getRoom(uid, roomID) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/getRoom',
            data: {
                uid,
                roomID
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
} 

// get room data for an array of rooms
async function getRooms(uid, rooms) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/getRooms',
            data: {
                uid,
                rooms
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
}

// add a new announcement to coresponding room
async function publishAnnouncement(uid, roomID, announcement) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/publishAnnouncement',
            data: {
                uid,
                roomID,
                announcement
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
}
