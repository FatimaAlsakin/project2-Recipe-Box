const isAdmin = (req, res, next) => {
    if (!req.session.user) return res.redirect("/auth/sign-in");
    if (req.session.user.isAdmin) return next();
    res.redirect("/");
};

module.exports = isAdmin;
