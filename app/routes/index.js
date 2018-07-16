const path = require("path");
const router = require("express").Router();
const {ensureGuest, ensureAuthenticated} = require('./auth');


app.use(require('./auth/')); // main routes


// If no API routes are hit, send the React app
// if (process.env.NODE_ENV === 'production') {
	router.use(function(req, res) {
	  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
	});
//  }

module.exports = router;
