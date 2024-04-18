module.exports.index2 = function (req, res) {


    return res.json(200, {
        message: 'Another List version 2.0',
        list: ['another list']
    })
}