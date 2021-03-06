const db = require("../database");

module.exports = {
  addLyric: (req, res) => {
    let lyricData = {
      id: db
        .get("lyricsId")
        .value()
        .toString(),
      songName: req.body.name,
      songLyric: req.body.lyric
    };

    db.get("lyrics")
      .push(lyricData)
      .write();

    db.update("lyricsId", n => n + 1).write();

    res.status(200).send(lyricData);
  },
  getOne: (req, res) => {
    let lyric = db
      .get("lyrics")
      .find({ id: req.params.id })
      .value();

    if (lyric) {
      res.status(200).send(lyric);
    } else {
      res.status(404).send({
        message: "Not found"
      });
    }
  },
  updateOne: (req, res) => {
    let lyricData = {
      id: req.params.id,
      songName: req.body.name,
      songLyric: req.body.lyric
    };

    db.get("lyrics")
      .find({ id: parseInt(req.params.id) })
      .assign(lyricData)
      .write();

    res.status(200).send("OK");
  },
  removeOne: (req, res) => {
    db.get("lyrics")
      .remove({ id: req.params.id })
      .write();

    res.status(200).send("OK");
  },
  getAll: (req, res) => {
    let lyrics = db.get("lyrics").value();

    res.status(200).send(lyrics);
  },
  search: (req, res) => {
    let lyrics = db.get("lyrics").value();

    let { query } = req.params;

    query = query.toLowerCase();

    function condition(e) {
      return e.songName.toLowerCase().includes(query);
    }

    let lyricWithQuery = lyrics.filter(condition);

    res.status(200).send(lyricWithQuery);
  }
};
