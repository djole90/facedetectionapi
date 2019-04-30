exports.handleRegister = (req, res, db, bcrypt) => {
    const { email, password, name } = req.body

    if (!email || !name || !password) {
        return res.status(400).json({error: 'incorrect form submission'})
    }
    
    bcrypt.hash(password, 10, (err, hash) => {
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .catch(err => res.json(err))
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name,
                    joined: new Date()
                })
                .then(user => { 
                    res.json(user[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        

    });
}
