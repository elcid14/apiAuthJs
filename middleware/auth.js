const jwt = require("jsonwebtoken");


//define login vlaidation. This is used to ensure user has proper token for access.
exports.validLogin = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (decoded) {
            next();
          } else {
            console.error(err)
            return next({ status: 401, message: "Please Log In First" });
          }
        });
      } catch (e) {
        console.log({e});
        return next({ status: 401, message: "Please Log In First" });

      }
    };
