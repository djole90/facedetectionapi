exports.handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({error: 'email and password not provided'})
    }

   db.select('email', 'hash')
   .from('login')
   .where('email','=', email)
   .then(data => {
       bcrypt.compare(password, data[0].hash).then(isValid => {
           if (!isValid) {
               return res.status(400).json({error: 'wrong password'})
           }

            db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => res.json(user[0]))
       })
   })
   .catch(err => res.status(400).json({error: 'user not found'}))
    
}

