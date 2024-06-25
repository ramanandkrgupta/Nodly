const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL (req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : 'url is required'})
    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render('home', {
        id: shortId,
    });
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json(
        { 
        totalClicks: result.visitHistory.length,
        deatils: result.visitHistory,
 
       // analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}
