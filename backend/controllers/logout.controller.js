const RefreshToken=require('../models/RefreshToken');

const logoutUser=async (req, res) => {
    const { refreshToken } = req.body;

    await RefreshToken.deleteOne({token: refreshToken});

    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports={logoutUser};