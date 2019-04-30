exports.handleProfile = (req, res, db) => {
    const { id } = req.params
    
    db.select('*')
    .from('users')
    .where({id})
    .then(user =>{
        if (user.length === 0) {
            return res.status(400).json({error: 'user not found'})
        }
        res.json(user[0])
    })
    .catch(err => res.status(400).json({error: 'error getting user', err}))   
}