const {connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto');

// ENV variables
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;


const signup = async (req, res) => {

    try{
        const {fullName, userName, password, phoneNumber} = req.body;
        const user_id = crypto.randomBytes(16).toString('hex');
        const serverClient = connect(api_id,api_key,api_secret);

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createUserToken(user_id);
        res.status(200).json({token, fullName,userName,user_id, hashedPassword, phoneNumber});
    }
    catch(error){
        console.log(error)

        res.status(500).json({message:error})
    }
};
const login = async () => {
    try {
        const {userName, password} = req.body;
        const serverClient = connect(api_id,api_key,api_secret);
        const {users} = await client.queryUsers({name: username});

        if(!users.length) return res.status(400).json({message:'User not found'});

        const success = await bcrypt.compare(password, users[0].hashedPassword);
        const token = serverClient.createUserToken(users[0].id);

        if(success){
            res.status(200).json({token,fullName:user[0].fullName, username,user_id: user[0].id})
        }
        else{
            res.status(500).json({message: 'Incorrect Password'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
};

module.exports = {login, signup};