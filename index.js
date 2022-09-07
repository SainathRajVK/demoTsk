const express = require("express");
const appe = express();
const realm = require("realm");
const port = 6000;
const app = new Realm.App({ id: "indo-abbpy" });
const jwt=require('jsonwebtoken')
const verifyToken=require('./verify')
appe.use(express.json())
appe.use(express.urlencoded({extended:true}));
appe.post("/signup", (req, res) => {
  async function handleRegister() {
    try {
      const { email, password } = req.body;
      console.log(email,password);
      await app.emailPasswordAuth.registerUser({ email, password });
      console.log("Registerd succesfully",);
      res.send("Resgistered Successfuly");
    } catch (err) {
      res.send(err);
    }
  }
  handleRegister();
});
appe.post("/signin", (req, res) => {
  async function handleLogin() {
    try {
      const { email, password } = req.body;
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);
      console.log("LOGIN succesfully",user.accessToken);
      res.json({message:user.accessToken}
      )
    } catch (err) {
      res.send(err);
    }
  }
  handleLogin()
});
appe.get('/loggedIn',verifyToken,(req,res)=>{
  res.send("Working")
})

appe.listen(port, () => {
  console.log(`App running at port ${port}`);
});

