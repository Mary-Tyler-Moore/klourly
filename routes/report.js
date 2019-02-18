const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    app.post('/api/report/getRoomReports', (req, res) => {

        console.log('GETTING REPORTS-------------------------------')
        console.log(req.body);
        console.log('-----------------------------------------------')

        // get reference to the rooms checkins history
        const checkinsRef = db.ref(`rooms/${req.body.roomID}/checkins`);
        checkinsRef.orderByChild('startTime').once('value', snapshot => {

            console.log(snapshot.val());

            // send back response containing success message
            // and the rooms checkins history data
            res.status(200).json({
                success: true,
                message: 'Successfully fetched room checkins',
                checkins: snapshot.val()
            });
        });
    });
}
