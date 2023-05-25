const { Router } = require("express");
const {
  addSong,
  getAllSongs,
  updateSong,
  deleteSong,
  searchSongByTitle,
} = require("../controller/song-controller.js");
const router = Router();

router.get("/", getAllSongs);
router.post("/addsong", addSong);
router.patch("/updatesong/:id", updateSong);
router.delete("/deletesong/:id", deleteSong);
router.get("/searchsong/:title", searchSongByTitle);
module.exports = router;
