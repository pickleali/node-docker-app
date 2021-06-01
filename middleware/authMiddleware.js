const protect = (req, res, next) => {
    const {
        user
    } = req.session;

    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'unauthorized'
        });
    }

    req.user = user;

    //send to controller to the middeware in the stack
    next();
}

module.exports = protect