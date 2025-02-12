
const authenticate = require("../Middlewares/Authenticate")
const BlogsRoutes = require('../Routes/BlogsRoutes')
const UserRoutes = require("../Routes/UserRoutes");
const errorMiddleware = require('../Middlewares/error');

module.exports = function (app, express) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/blogs', authenticate, BlogsRoutes);
    app.use("/user", UserRoutes);
    app.get(["/", "/*"], (req, res, next) => {
        res.status(404).send({ message: "Your requested page is not found" });
    });
    app.use(errorMiddleware);

}

