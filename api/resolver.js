var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var sizeOf = require('image-size');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // Giphy image urls are in the format:
  // http://giphy.com/gifs/<seo-text>-<alphanumeric id>
  var matches = url.match(/\-([a-zA-Z0-9]+)$/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var id = matches[1];

  var response;
  try {
    response = sync.await(request({
      url: 'http://www.omdbapi.com/?t=' + encodeURIComponent(id),
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var image = response.Poster;
  var dimensions = sizeOf(image);
  var width = dimensions.width > 600 ? 600 : dimensions.width;
  var html = '<img style="max-width:100%;" src="' + image.url + '" width="' + width + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};
