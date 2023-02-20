// @ts-nocheck
const express = require('express');
const router = express.Router();
const MoviesController = require("../controller/movies");

// miscellaneous
router.get('/getPopular', MoviesController.getPopular);
router.get('/getLatest', MoviesController.getLatest);
router.get('/getTopRated', MoviesController.getTopRated);
router.get('/getChanges', MoviesController.getChanges);
router.get('/getNowPlaying', MoviesController.getNowPlaying);
router.get('/getUpcoming', MoviesController.getUpcoming);

router.get('/getList', MoviesController.getList);
router.get('/getTrending', MoviesController.getTrending);
router.get('/getDetails', MoviesController.getDetails);
router.get('/getMovieList', MoviesController.getMovieList);
router.get('/getKeywords', MoviesController.getKeywords);

router.post('/addFavourite', MoviesController.addFavourite);
router.get('/getFavourite', MoviesController.getFavourite);

router.get('/getSearch', MoviesController.getSearch);


module.exports = router;
