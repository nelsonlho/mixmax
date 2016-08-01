var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var size = require('request-image-size');
var parseURL = require('url');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();
  var parsedURL = parseURL.parse(url);

  // Getting the query portion of the URL
  // Movies are to be searched in the format http://www.omdbapi.com/?t=titanic
  var query = parsedURL.query;
  if (!query) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var response;
  try {
    response = sync.await(request({
      url: 'http://www.omdbapi.com/?' + query,
      timeout: 15*1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }
  var movieObject = JSON.parse(response.body);

  var image = movieObject.Poster;
  var width;
  size(image, function(err, dimensions, length){
    width = dimensions.width;
  });
  var html = '<img style="max-width:100%;" src="' + image + '" width="' + width + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};
