const User = require('../model/User');

module.exports.postSignup = async (req, res) =>{
    const user = new User({
        displayName: req.body.displayName,
        username: req.body.username,
        password: req.body.password
        });
    try{
        const saveUser = await user.save();
        res.send({user: user._id});
        } catch(err){
            console.log(err);
            res.status(400).send(err);
}
}


module.exports.postSignin = (req, res) =>{
    res.send('login');
}