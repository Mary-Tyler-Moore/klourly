const firebase = require('firebase-admin');
const db = firebase.database();

module.exports = app => {

    // set a messaging token for a user
    app.post('/api/messaging/setToken', (req, res) => {

        // get users messaging ref
        const messagingRef = db.ref(`users/${req.body.uid}/messaging`);

        // access messaging ref data
        messagingRef.once('value', snapshot => {

            // if no ref is set (eg: first time user),
            // set messaging and token ref
            if (!snapshot.val()) {
                messagingRef.set({ token: req.body.token });
            }

            // if set but token is equal (no need to update)
            else if (snapshot.val().token !== req.body.token)  {
                messagingRef.update({ token: req.body.token });
            }

            // send back response with success message
            res.status(200).json({
                success: true,
                message: 'Successfully validated messaging token'
            });

        });
    });

    // get a messaging token for a user
    app.post('/api/messaging/getToken', (req, res) => {

    });

    // get all messaging tokens for members of a room
    app.post('/api/messaging/getRoomMembersToken', (req, res) => {

        // itterate over members
        req.body.members.forEach(uid => {

            // get users messaging ref
            const tokenRef = db.ref(`users/${uid}/messaging/token`);

            // access users messaging token
            tokenRef.once('value', snapshot => {

                // validate that token is present
                if (snapshot.val()) {

                    // See documentation on defining a message payload.
                    const message = {
                        data: {
                            title: 'Portugal vs. Denmark',
                            body: '5 to 1',
                            icon: 'firebase-logo.png',
                            click_action: 'http://localhost:8081'
                        },
                        token: snapshot.val()
                    };
                    
                    // Send a message to the device corresponding to the provided registration token.
                    firebase.messaging().send(message)
                        .then((response) => console.log('Successfully sent message:', response))
                        .catch((error) => console.log('Error sending message:', error));
                }
            });
        });

        // send back response with success message
        res.status(200).json({
            success: true,
            message: 'Successfully published notification that room is active'
        });
    });
}