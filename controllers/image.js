const Clarifai = require('clarifai') 

const app = new Clarifai.App({
  apiKey: '8a996a34ac57405c87fbcbccddc53b4e'
});



exports.handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.imageURL)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err))
}

exports.handleImage = (req, res, db) => {
    const { id } = req.body
    
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if (entries.length === 0) {
            return res.status(400).json({error: 'user with ' + id + 'not found'})
        }
        res.json(entries[0])
    })
    .catch(err => res.status(400).json({error: 'unable to get entries', err}))

}