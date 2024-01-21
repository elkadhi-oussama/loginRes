const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User.js");
const router = express.Router();

//register user

router.post("/register", async (req, res) => {
  const { email, password, name, pseudo } = req.body;
  try {
    const checkMail = await User.findOne({ email });
    if (checkMail) {
      return res.status(400).send({ msg: "Bad credential" });
    }

    const newUser = new User({ email, password, name, pseudo });
    // hashed password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    newUser.password = passwordHashed;
    //end

    await newUser.save();

    res
      .status(200)
      .send({ msg: "the register of new user success", response: newUser });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Can not register the new user", response: error });
  }
});
// end register 

//login user
router.post("/login", async(req,res)=>{
    const { email, password } = req.body;
    try {
        const userMail = await User.findOne({email})
        if(!userMail){
            return res.status(400).send({ msg: "Bad credential" });
        }
        const passwordUser = await bcrypt.compare(password, userMail.password)
        if(!passwordUser){
            return res.status(400).send({ msg: "Bad credential" });
        }

        res.status(200).send({msg: 'login succes', response : userMail})
        
    } catch (error) {
        res
        .status(500)
        .send({ msg: "Can not register the new user", response: error });  
    }
})

//end login 
module.exports = router;
