const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.post('/login',(req,res)=>{
    setTimeout(() => {
        
    
    const {email,password} = req.body

  //check if there is a user with that email
  sql = `SELECT * from tbl_employes where email='${email}'`
  con.query(sql, async (err, select) => {
      if (err) return res.send('Something went wrong !')
      if (select.length <= 0) {
              return res.send('Email doesn\'t Exists');
      }

      //compare password
      const validpassword = await bcrypt.compare(password,select[0].password);
      if(!validpassword){
          return res.send('Invalid Password');
      }

       //give a token to our user
       const token = jwt.sign({id:select[0].id},process.env.SECRET_TOKEN)
       res.json({msg:'OK',token:token,user:select[0],auth:true})
    })

}, 3000);
})





module.exports = router