const model = require("../AfricanMarket/AfricanMarket-models")

async function validItemId(req, res, next) {
    try {
        const item = await model.findItemsById(req.params.id);
        if (!item) {
            res.status(400).json({ error: 'This Id does not exists' });
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    validItemId
}