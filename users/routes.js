import * as dao from "./dao.js";

// let currentUser = null;

function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const findUserByUsername = async (req, res) => {
        try {
            const username = req.params.username;
            const user = await dao.findUserByUsername(username);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const findUserByCredentials = async (req, res) => {
        const { username, password } = req.params;
        const user = await dao.findUserByCredentials(username, password)
        res.json(user);
    };

    // const updateUser = async (req, res) => {
    //     const { userId } = req.params;
    //     console.log("Updating user with ID:", userId); // Log received ID
    //     console.log("Received data:", req.body); // Log received data
    //     try {
    //         const status = await dao.updateUser(userId, req.body);
    //         // const currentUser = await dao.findUserById(userId);
    //         req.session["currentUser"]=currentUser;
    //         res.json(status);
    //     } catch (error) {
    //         console.error("Error updating user:", error); // Log any errors
    //         res.status(500).json({ error: error.message });
    //     }
    // };

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };

    const updateFirstName = async (req, res) => {
        const id = req.params.id;
        const newFirstName = req.params.newFirstName;
        const status = await dao.updateUser(id, { firstName: newFirstName });
        res.json(status);
    }

    const signup = async (req, res) => {
        const existingUser = await dao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.status(400).json({ message: "Username already taken" });
        } else {
            const newUser = await dao.createUser(req.body);
            req.session.currentUser = newUser; // Set the new user in the session
            res.json(newUser);
        }
    };


    const signin = async (req, res) => {
        const { username, password } = req.body;
        const user = await dao.findUserByCredentials(username, password);
        if (user) {
            req.session.currentUser = user; // Set the user in the session
            res.json(user);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    };


    const signout = (req, res) => {
        // currentUser = null;
        req.session.destroy();
        res.sendStatus(200);
    };

    const account = async (req, res) => {
        console.log("Accessing account route, Session:", req.session);
        if (req.session.currentUser) {
            console.log("Accessing account route, Session:", req.session);

            res.json(req.session.currentUser);
        } else {
            console.log("No current user");
            res.status(404).json({ message: "No current user" });
        }
    };



    app.get("/api/users", findAllUsers);
    app.get("/api/users/:id", findUserById);
    app.get('/api/users/username/:username', findUserByUsername);
    // app.get("/api/users/:username/:password/:email/:role",createUser)
    app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName)
    app.get("/api/users/delete/:id", deleteUser);
    // app.get("/api/users/account", account);
    // app.get('/api/users/credentials/:username/:password', findUserByCredentials);

    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);

    app.post("/api/users", createUser);
    app.post("/api/users/account", account);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
}

export default UserRoutes;