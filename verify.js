  const jwt=require('jsonwebtoken')
  const jwtKey='asdausddxsa';
   module.exports =(req, res, next) => {
         
        const {authorization}=req.headers
        if(!authorization){
            return res.status(401).json({error:"You should enter Login"})
        }
        const token=authorization.replace("Bearer ","")
        if (!token) {
          return res.status(401).send({ message: "No token given!" });
        }
      
        jwt.verify(token,jwtKey,(err, payload) => {
          if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
          }
          req.user.id = payload.id;
          next();
        });
       
    }