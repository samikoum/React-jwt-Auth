const jwt = require('jsonwebtoken')

function verifyToken(req,res,next) {
    const token = req.headers['authorization']
    console.log(token)
    if(token !=='null') {
     jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=>{
         if(err) return res.status(403).send('Access Denied')
         console.log('USER',user)
         req.user = user
         next()
     })
    }else {
        res.status(403).send('Access Denied')
    }
  }


module.exports = verifyToken