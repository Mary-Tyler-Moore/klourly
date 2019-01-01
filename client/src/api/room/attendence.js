import { authHeader } from '../../helpers/authHeader';
import axios from 'axios';

export const attendence = {
    registerAttendence
}

// register attendence for a user aswell as lookup if already checkedin
async function registerAttendence(validate, uid, roomID, attendenceData) {
    try {
        const response = await axios({
            headers: authHeader(),
            method: 'post',
            url: '/api/registerAttendence',
            data: {
                validate,
                uid,
                roomID,
                attendenceData
            }
        });

        return response;
    }

    catch(error) {
        console.log(error);
    }
} 