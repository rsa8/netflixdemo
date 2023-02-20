const bcrypt = require("bcrypt"); // npm i bcryptjs
const Movies = require("../model/movies");
var moment = require('moment-timezone');
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('89b5c911e4bee493675c6758e7b5d3bb');

exports.addFavourite = (req, res, next) => {

  const movie = new Movies({
    useremail: req.body.profile,
    movie: req.body.movie.movie,
    cast: req.body.movie.cast,
    details: req.body.movie.movieDetails
  });
  movie.save()
  .then(response => {
    res.status(201).json({
        message: "Movie added to fav",
        user: response
    });
  })
  .catch(err => {
      res.status(401).json({
          message: "Movie not added",
          user: err
      });
  })
}
exports.getFavourite = (req, res, next) => {
  // const results = await SiteModel.find({});
  console.log(req.query.email);
  Movies.find({ useremail: req.query.email })
  .then(response => {

    res.status(200).json({
        status: 1,
        message: "Movie fetched",
        movie: response
    });
  })
  .catch(err => {
      res.status(401).json({
          message: "Movie not added",
          status: 0,
          movie: err
      });
  })
}
exports.getList = (req, res, next) => {
  (async () => {
    try {
      const args = {
        pathParameters: {
         movie_id: 550
        },
        query: {
          page: 2
        },
        body: {
          // data for request body
        },
      };
      const movie = await mdb.movie.getLists(args);
      res.status(200).json({
        movies: movie,
        status: 1
      });
      /*
        {
          data: Object. Parsed json data of response
          headers: Object. Headers of response
        }
      */
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}


exports.getDetails = (req, res, next) => {
  (async () => {
    try {
      const args = {
        pathParameters: {
          movie_id: req.query.id,
        },
      };
      const movie = await mdb.movie.getDetails(args);
      const cast = await mdb.movie.getCredits(args);
      res.status(200).json({
        movies: movie,
        cast: cast,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}

exports.getMovieList = (req, res, next) => {
  (async () => {
    try {
      const args = {
        pathParameters: {
          movie_id: 384018,
        },
      };
      const movie = await mdb.genre.getMovieList();
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getKeywords = (req, res, next) => {
  (async () => {
    try {
      const args = {
        pathParameters: {
          movie_id: 384018,
          keywords: {
            id: 28,
            name: 'action'
          }
        },
      };
      const movie = await mdb.movie.getKeywords(args);
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}

// miscellaneous movies
exports.getTrending = (req, res, next) => {
  (async () => {
    try {
      const pathParams = {
        pathParameters: {
          media_type: 'all',
          time_window: 'day'
        },
      };
      // @ts-ignore
      const movie = await mdb.trending.getTrending(pathParams);
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getPopular = (req, res, next) => {
  (async () => {
    try {
      // @ts-ignore
      const movie = await mdb.movie.getPopular();
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getLatest = (req, res, next) => {
  (async () => {
    try {
      // @ts-ignore
      const movie = await mdb.movie.getLatest();
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getTopRated = (req, res, next) => {
  (async () => {
    try {
      // @ts-ignore
      const movie = await mdb.movie.getTopRated();
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getChanges = (req, res, next) => {
  (async () => {
    try {
      // @ts-ignore
      const movie = await mdb.movie.getChanges();
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getNowPlaying = (req, res, next) => {
  (async () => {
    try {
      // @ts-ignore
      const movie = await mdb.movie.getNowPlaying();
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getUpcoming = (req, res, next) => {
  (async () => {
    try {
      // @ts-ignore
      const movie = await mdb.movie.getUpcoming();
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {
      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}
exports.getSearch = (req, res, next) => {
  (async () => {
    try {
      const pathParams = {
        query: {
          query: req.query.name,
          page: 1
        }
      };
      const movie = await mdb.search.movies(pathParams);
      res.status(200).json({
        movies: movie,
        status: 1
      });
    } catch (error) {

      res.status(404).json({
        movies: error,
        status: 1
      })
    }
  })();
}



