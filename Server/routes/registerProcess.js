const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/register',  (req, res) => {
    setTimeout(() => {

 const { username, email, password, confirmpassword } = req.body

    //check if there is a user with that email
    sql = `SELECT * from tbl_employes where email='${email}'`
    con.query(sql, async (err, select) => {
        if (err) return res.send('Something went wrong !')
        if (select.length > 0) {
                return res.send('Email Already Exists');
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);

        //save user to DB we must use try and catch
        try {
            sql2 = `INSERT into tbl_employes (username,email,password,confirmpassword) VALUES ('${username}','${email}','${hashedPassword}','${hashedPassword}')`
            con.query(sql2, (err, insert) => {
                if (err) {
                    console.log(err)
                    return res.send('Something went wrong !')
                }
                res.send('OK')
            })
        } catch (err) {
            res.status(400).send('Something is wrong try again !');
        }
    })

}, 2000);
})


module.exports = router