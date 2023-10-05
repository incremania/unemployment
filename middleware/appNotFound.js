const appNotFound = (req, res ) => res.status(404).json({ error: 'app not found'})

module.exports = {
    appNotFound
}