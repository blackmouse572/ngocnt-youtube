const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const youtubeSchema = new Schema({
  kind: {
    type: String,
  },
  etag: {
    type: String,
  },
  nextPageToken: {
    type: String,
  },
  regionCode: {
    type: String,
  },
  pageInfo: {
    totalResults: {
      type: Number,
    },
    resultsPerPage: {
      type: Number,
    },
  },
  items: [youTubeItem],
});

const youTubeItem = new Schema({
  kind: {
    type: String,
    required: true,
    unique: true,
  },
  etag: String,
  id: {
    kind: String,
    channelId: String,
    videoId: String,
  },
});

module.exports = mongoose.Schema("YouTubes", youtubeSchema);
