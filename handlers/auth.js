//imports
const db = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")

//define register route
//this routes is used to register a user by email and password. Then assigns token to user.
exports.register = async (req,res,next) => {
try {
    
    //define body
    const { email, password } = req.body;

    //validate email and password input
    if(!(email && password)){
        res.status(403).json("Requires email and password");
    }
    //check if user exists
    const userExists = await db.User.findOne({ email });
    if(userExists) {
    return res.status(403).json("User already exists");
}
    //add user to database
    const user = await db.User.create({
        email: email.toLowerCase(),
        password:password
    })

    //send user info to rethink db endpoint
    try {
      const res = await axios.post("http://localhost:3000/api/author", {
        id: user.id,
        email: user.email
      }).then((res) => console.log(res.data))
      
    } catch (error) {
      console.log(error)
    }
    

    res.status(200).json(user);
} catch (error) {
    return next(error).status(500)
}

}

//define login handler. This is used to login a user by assgining a valid JWT token to that user. 
exports.login = async (req,res,next) => {
        try {
            // Get user input
            const { email, password } = req.body;
        
            // Validate user input
            if (!(email && password)) {
              res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
            const user = await db.User.findOne({ email });
            const id = user.id
            const isMatch = bcrypt.compare(password, user.password);
            if (user && isMatch) {
              // Create token
              const token = jwt.sign(
                { id, email },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1h",
                }
              );
        
              // user
              res.status(200).json({id, email, token});
            }
            //res.status(400).send("Invalid Credentials");
          } catch (err) {
            res.status(400).send("Invalid Credentials");
            console.log(err);
          }
        }
