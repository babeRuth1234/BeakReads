// isadmin.js
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        // User is an admin, proceed to the next middleware or route
        next();
    } else {
        // User is not an admin, redirect to a different page or show an error
        return res.render('include/_error-page');

    }
};

module.exports = isAdmin;
