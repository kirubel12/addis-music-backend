const Song = require("../model/song");

const addSong = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("Req: ", req.body);
  const { title, artist, album, year, gener } = req.body;
  if (!title || !artist || !album || !gener || !year) {
    res.status(400).json({ message: "All fields are required" });
  } else {
    try {
      const newSong = await Song.create(req.body);
      res.status(201).json(newSong);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const getAllSongs = async (req, res) => {
  //get all Songs
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const songs = await Song.find();
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSong = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Song.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Song with id=${id}. Maybe Song was not found!`,
        });
      } else res.send({ message: "Song was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Song with id=" + id,
      });
    });
};

const deleteSong = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSongByTitle = async (req, res) => {
  const title = req.params.title;
  res.setHeader("Content-Type", "application/json");

  // search a song title while they typing  using express and mongodb
  try {
    const songs = await Song.find({ title: { $regex: title, $options: "i" } });
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addSong,
  getAllSongs,
  updateSong,
  deleteSong,
  searchSongByTitle,
};
