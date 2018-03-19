/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/start.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/connectDb.js":
/*!**************************!*\
  !*** ./src/connectDb.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.dbUrl = undefined;\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _mongooseRedisCache = __webpack_require__(/*! mongoose-redis-cache */ \"mongoose-redis-cache\");\n\nvar _mongooseRedisCache2 = _interopRequireDefault(_mongooseRedisCache);\n\nvar _redisOpts = __webpack_require__(/*! ./utils/redisOpts */ \"./src/utils/redisOpts.js\");\n\nvar _redisOpts2 = _interopRequireDefault(_redisOpts);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// using the native Promise lib\n_mongoose2.default.Promise = global.Promise; /**\n                                              * This file is required in the first place when we need the database.\n                                              * Connection to mongodb is made here.\n                                              */\n\nvar _process$env = process.env,\n    NODE_ENV = \"development\",\n    HOST = _process$env.HOST,\n    MONGODB_USERNAME = _process$env.MONGODB_USERNAME,\n    MONGODB_PASSWORD = _process$env.MONGODB_PASSWORD,\n    MONGODB_DATABASE = _process$env.MONGODB_DATABASE;\n\n// connection URL\n\nvar dbUrl = exports.dbUrl = 'mongodb://' + MONGODB_USERNAME + ':' + MONGODB_PASSWORD + ('@mongodb/' + MONGODB_DATABASE);\n\n// set debug mode if necessary\nNODE_ENV === 'development' && _mongoose2.default.set('debug', true);\n\n// connection...\n_mongoose2.default.connect(dbUrl, {\n  server: {\n    auto_reconnect: true\n  }\n});\n\n// seems to not work... not enough time to check :(\n(0, _mongooseRedisCache2.default)(_mongoose2.default, (0, _redisOpts2.default)());\n\n// some listener to check the connection status\nvar connection = _mongoose2.default.connection;\nconnection.on('error', console.error.bind(console, 'DB connection error:'));\nconnection.once('open', function () {\n  return console.log('DB connection established!');\n});\n\n// we do not forget to nicely close the connection if needed\nprocess.on('SIGINT', function () {\n  _mongoose2.default.connection.close(function () {\n    console.log('DB connection disconnected');\n    process.exit(0);\n  });\n});\n\nexports.default = { dbUrl: dbUrl, connection: connection };\n\n//# sourceURL=webpack:///./src/connectDb.js?");

/***/ }),

/***/ "./src/createApp.js":
/*!**************************!*\
  !*** ./src/createApp.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _koa = __webpack_require__(/*! koa */ \"koa\");\n\nvar _koa2 = _interopRequireDefault(_koa);\n\nvar _koaLogger = __webpack_require__(/*! koa-logger */ \"koa-logger\");\n\nvar _koaLogger2 = _interopRequireDefault(_koaLogger);\n\nvar _koaBodyparser = __webpack_require__(/*! koa-bodyparser */ \"koa-bodyparser\");\n\nvar _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);\n\nvar _koaJson = __webpack_require__(/*! koa-json */ \"koa-json\");\n\nvar _koaJson2 = _interopRequireDefault(_koaJson);\n\nvar _koaJsonFilter = __webpack_require__(/*! koa-json-filter */ \"koa-json-filter\");\n\nvar _koaJsonFilter2 = _interopRequireDefault(_koaJsonFilter);\n\nvar _koa2Cors = __webpack_require__(/*! koa2-cors */ \"koa2-cors\");\n\nvar _koa2Cors2 = _interopRequireDefault(_koa2Cors);\n\nvar _corsOpts = __webpack_require__(/*! ./utils/corsOpts */ \"./src/utils/corsOpts.js\");\n\nvar _corsOpts2 = _interopRequireDefault(_corsOpts);\n\nvar _sessions = __webpack_require__(/*! ./router/sessions */ \"./src/router/sessions.js\");\n\nvar _sessions2 = _interopRequireDefault(_sessions);\n\nvar _movies = __webpack_require__(/*! ./router/movies */ \"./src/router/movies.js\");\n\nvar _movies2 = _interopRequireDefault(_movies);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// returns an Koa application instance\nexports.default = function () {\n\n  var app = new _koa2.default();\n\n  app.use((0, _koaLogger2.default)());\n  app.use((0, _koa2Cors2.default)((0, _corsOpts2.default)()));\n  app.use((0, _koaJson2.default)());\n  app.use((0, _koaJsonFilter2.default)());\n  app.use((0, _koaBodyparser2.default)());\n\n  app.use(_sessions2.default.routes());\n  app.use(_movies2.default.routes());\n\n  return app;\n};\n\n//# sourceURL=webpack:///./src/createApp.js?");

/***/ }),

/***/ "./src/model/movie.js":
/*!****************************!*\
  !*** ./src/model/movie.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.MovieSchema = exports.VideoSchema = exports.ProductionCountry = exports.ProductionCompany = exports.SpokenLanguage = exports.GenreSchema = exports.CollectionSchema = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _mongooseTimestamp = __webpack_require__(/*! mongoose-timestamp */ \"mongoose-timestamp\");\n\nvar _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);\n\nvar _moviedb = __webpack_require__(/*! ../moviedb */ \"./src/moviedb.js\");\n\nvar _moviedb2 = _interopRequireDefault(_moviedb);\n\nvar _url = __webpack_require__(/*! url */ \"url\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; } /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * This file exports the Movie model.\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */\n\nvar CollectionSchema = exports.CollectionSchema = _mongoose2.default.Schema({\n  id: Number,\n  name: String,\n  poster_path: String,\n  backdrop_path: String\n});\n\nvar GenreSchema = exports.GenreSchema = _mongoose2.default.Schema({\n  id: Number,\n  name: String\n});\n\nvar SpokenLanguage = exports.SpokenLanguage = _mongoose2.default.Schema({\n  iso_639_1: String,\n  name: String\n});\n\nvar ProductionCompany = exports.ProductionCompany = _mongoose2.default.Schema({\n  id: Number,\n  name: String,\n  logo_path: String,\n  origin_country: String\n});\n\nvar ProductionCountry = exports.ProductionCountry = _mongoose2.default.Schema({\n  iso_3166_1: String,\n  name: String\n});\n\nvar VideoSchema = exports.VideoSchema = _mongoose2.default.Schema({\n  id: String,\n  iso_639_1: String,\n  iso_3166_1: String,\n  key: String,\n  name: String,\n  site: String,\n  size: Number,\n  type: String\n});\n\nvar MovieSchema = exports.MovieSchema = _mongoose2.default.Schema({\n  id: Number,\n  imdb_id: String,\n  title: String,\n  status: String,\n  release_date: Date,\n  tagline: String,\n  overview: String,\n  homepage: String,\n  poster_path: String,\n  backdrop_path: String,\n  original_language: String,\n  original_title: String,\n  popularity: Number,\n  vote_average: Number,\n  vote_count: Number,\n  adult: Boolean,\n  budget: Number,\n  revenue: Number,\n  trailer: VideoSchema,\n  videos: [VideoSchema],\n  genres: [GenreSchema],\n  spoken_languages: [SpokenLanguage],\n  belongs_to_collection: [CollectionSchema],\n  production_companies: [ProductionCompany],\n  production_countries: [ProductionCountry]\n});\n\n// returns all known genres from the moviedb API\nMovieSchema.statics.getGenres = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n  return regeneratorRuntime.wrap(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          _context.next = 2;\n          return _moviedb2.default.genreMovieList();\n\n        case 2:\n          return _context.abrupt('return', _context.sent.genres);\n\n        case 3:\n        case 'end':\n          return _context.stop();\n      }\n    }\n  }, _callee, undefined);\n}));\n\n// resolve absolute images paths on movies\nMovieSchema.statics.getImagesResolver = function (_ref2) {\n  var baseUrl = _ref2.baseUrl,\n      width = _ref2.width;\n\n  var resolveImage = function resolveImage(img) {\n    return img ? [baseUrl, width, img].join('') : null;\n  };\n  return function (movie) {\n    return _extends({}, movie, {\n      poster_path: resolveImage(movie.poster_path),\n      backdrop_path: resolveImage(movie.backdrop_path),\n      belongs_to_collection: [].concat(movie.belongs_to_collection || []).map(function (collection) {\n        return _extends({}, collection, {\n          poster_path: resolveImage(collection.poster_path),\n          backdrop_path: resolveImage(collection.backdrop_path)\n        });\n      }),\n      production_companies: [].concat(movie.production_companies || []).map(function (company) {\n        return _extends({}, company, {\n          logo_path: resolveImage(company.logo_path)\n        });\n      })\n    });\n  };\n};\n\n// we would like to use some cache\nMovieSchema.set('redisCache', true);\n\n// create createdAt & updatedAt fields and manage them\nMovieSchema.plugin(_mongooseTimestamp2.default);\n\nvar Movie = _mongoose2.default.model('Movie', MovieSchema);\n\nexports.default = Movie;\n\n//# sourceURL=webpack:///./src/model/movie.js?");

/***/ }),

/***/ "./src/model/session.js":
/*!******************************!*\
  !*** ./src/model/session.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.SessionSchema = exports.CarouselStateSchema = undefined;\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _mongooseTimestamp = __webpack_require__(/*! mongoose-timestamp */ \"mongoose-timestamp\");\n\nvar _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * This file exports the Session model.\n * Because the API and the client are truly separated,\n * we have to deal with CORS. So, because I miss some time,\n * I decided to implement a very basic session object.\n */\n\nvar CarouselStateSchema = exports.CarouselStateSchema = _mongoose2.default.Schema({\n  id: String,\n  slideIndex: Number\n});\n\nvar SessionSchema = exports.SessionSchema = _mongoose2.default.Schema({\n  views: {\n    type: [String],\n    default: []\n  },\n  carousels: {\n    type: [CarouselStateSchema],\n    default: []\n  }\n});\n\n// createdAt & updatedAt fields\nSessionSchema.plugin(_mongooseTimestamp2.default);\n\nvar Session = _mongoose2.default.model('Session', SessionSchema);\n\nexports.default = Session;\n\n//# sourceURL=webpack:///./src/model/session.js?");

/***/ }),

/***/ "./src/moviedb.js":
/*!************************!*\
  !*** ./src/moviedb.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _moviedbPromise = __webpack_require__(/*! moviedb-promise */ \"moviedb-promise\");\n\nvar _moviedbPromise2 = _interopRequireDefault(_moviedbPromise);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// juste the moviedb client (https://www.themoviedb.org)\nexports.default = new _moviedbPromise2.default(process.env.MOVIEDB_API_KEY);\n\n//# sourceURL=webpack:///./src/moviedb.js?");

/***/ }),

/***/ "./src/router/movies.js":
/*!******************************!*\
  !*** ./src/router/movies.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _koaRouter = __webpack_require__(/*! koa-router */ \"koa-router\");\n\nvar _koaRouter2 = _interopRequireDefault(_koaRouter);\n\nvar _mongodb = __webpack_require__(/*! mongodb */ \"mongodb\");\n\nvar _movie = __webpack_require__(/*! ../model/movie */ \"./src/model/movie.js\");\n\nvar _movie2 = _interopRequireDefault(_movie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar router = new _koaRouter2.default();\n\n// returns all the available genres\nrouter.get('/movie_genres', function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return _movie2.default.getGenres();\n\n          case 2:\n            _context.t0 = function (genre) {\n              return genre.name;\n            };\n\n            ctx.body = _context.sent.map(_context.t0).sort();\n\n          case 4:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, undefined);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}());\n\n// returns a movie\nrouter.get('/movies/:id', function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            if (ctx.params.id) {\n              _context2.next = 4;\n              break;\n            }\n\n            tctx.res.status = 404;\n            ctx.body = { error: 'Movie ID required.' };\n            return _context2.abrupt('return');\n\n          case 4:\n            _context2.next = 6;\n            return _movie2.default.findOne({ _id: new _mongodb.ObjectID(ctx.params.id) }).exec();\n\n          case 6:\n            ctx.body = _context2.sent;\n\n          case 7:\n          case 'end':\n            return _context2.stop();\n        }\n      }\n    }, _callee2, undefined);\n  }));\n\n  return function (_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}());\n\n// returns movies (or count them)\n// can be filtered by genre (e.g. &genre=Drama)\n// can be sliced (e.g. &slice=4:10)\n// fields can be filtered (e.g. &filter=title)\nrouter.get('/movies', function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {\n    var query, count, skip, limit;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n\n            // filter\n            query = {};\n\n            if (ctx.query.genre) {\n              query.genres = {\n                $elemMatch: {\n                  name: ctx.query.genre\n                }\n              };\n            }\n\n            // if we juste want to count\n\n            if (!ctx.query.count) {\n              _context3.next = 8;\n              break;\n            }\n\n            _context3.next = 5;\n            return _movie2.default.find(query).count().exec();\n\n          case 5:\n            count = _context3.sent;\n\n            ctx.body = { count: count };\n            return _context3.abrupt('return');\n\n          case 8:\n            skip = Number(ctx.query.skip) || 0;\n            limit = Number(ctx.query.limit) || 10;\n            _context3.next = 12;\n            return _movie2.default.find(query).skip(skip).limit(limit).sort({ title: 'asc' }).lean().exec();\n\n          case 12:\n            ctx.body = _context3.sent;\n\n          case 13:\n          case 'end':\n            return _context3.stop();\n        }\n      }\n    }, _callee3, undefined);\n  }));\n\n  return function (_x3) {\n    return _ref3.apply(this, arguments);\n  };\n}());\n\nexports.default = router;\n\n//# sourceURL=webpack:///./src/router/movies.js?");

/***/ }),

/***/ "./src/router/sessions.js":
/*!********************************!*\
  !*** ./src/router/sessions.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _koaRouter = __webpack_require__(/*! koa-router */ \"koa-router\");\n\nvar _koaRouter2 = _interopRequireDefault(_koaRouter);\n\nvar _mongodb = __webpack_require__(/*! mongodb */ \"mongodb\");\n\nvar _session = __webpack_require__(/*! ../model/session */ \"./src/model/session.js\");\n\nvar _session2 = _interopRequireDefault(_session);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar router = new _koaRouter2.default();\n\n// handler that loads the current sesion\nvar loadSession = function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {\n    var _id;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _id = new _mongodb.ObjectID(ctx.params.id);\n            _context.next = 3;\n            return _session2.default.findOne({ _id: _id }).exec();\n\n          case 3:\n            ctx.session = _context.sent;\n\n            if (ctx.session) {\n              _context.next = 8;\n              break;\n            }\n\n            ctx.res.status = 404;\n            ctx.body = { error: 'Unknown session.' };\n            return _context.abrupt('return');\n\n          case 8:\n            next();\n\n          case 9:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, undefined);\n  }));\n\n  return function loadSession(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n// returns a session\nrouter.get('/sessions/:id', loadSession, function (ctx) {\n  ctx.body = ctx.session || { _id: null };\n});\n\n// pushes a view into a session\nrouter.post('/sessions/:id/views/:view', loadSession, function (ctx) {\n  var session = ctx.session,\n      params = ctx.params;\n\n  if (session.views[0] !== params.view) {\n    session.views = [params.view].concat(_toConsumableArray(session.views));\n    session.save();\n  }\n  ctx.body = session.views;\n});\n\n// returns a carousel state\nrouter.get('/sessions/:id/carousels/:cid', loadSession, function (ctx) {\n  ctx.body = ctx.session.carousels;\n  var idx = ctx.session.carousels.findIndex(function (c) {\n    return c.id === ctx.params.cid;\n  });\n  ctx.body = idx > -1 ? ctx.session.carousels[idx] : { index: 0 };\n});\n\n// updates a carousel state\nrouter.post('/sessions/:id/carousels/:cid/:slideIndex', loadSession, function (ctx) {\n  var _ctx$params = ctx.params,\n      cid = _ctx$params.cid,\n      slideIndex = _ctx$params.slideIndex;\n\n  var idx = ctx.session.carousels.findIndex(function (c) {\n    return c.id === cid;\n  });\n  if (idx < 0) {\n    ctx.session.carousels.push({ id: cid, slideIndex: Number(slideIndex) });\n  } else {\n    ctx.session.carousels[idx].slideIndex = Number(slideIndex);\n  }\n  ctx.session.save();\n  ctx.body = ctx.session.carousels;\n});\n\n// returns session views\nrouter.get('/sessions/:id/views', loadSession, function (ctx) {\n  ctx.body = ctx.session.views || [];\n});\n\n// deletes a session\nrouter.delete('/sessions/:id', loadSession, function (ctx) {\n  ctx.session.remove();\n  ctx.body = { removed: true };\n});\n\n// creates a new session\nrouter.post('/sessions', function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.next = 2;\n            return new _session2.default().save();\n\n          case 2:\n            ctx.body = _context2.sent;\n\n          case 3:\n          case 'end':\n            return _context2.stop();\n        }\n      }\n    }, _callee2, undefined);\n  }));\n\n  return function (_x3) {\n    return _ref2.apply(this, arguments);\n  };\n}());\n\nexports.default = router;\n\n//# sourceURL=webpack:///./src/router/sessions.js?");

/***/ }),

/***/ "./src/start.js":
/*!**********************!*\
  !*** ./src/start.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n\n__webpack_require__(/*! ./connectDb */ \"./src/connectDb.js\");\n\nvar _createApp = __webpack_require__(/*! ./createApp */ \"./src/createApp.js\");\n\nvar _createApp2 = _interopRequireDefault(_createApp);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// here we start to listen requests\n(0, _createApp2.default)().listen(process.env.API_PORT);\n\n//# sourceURL=webpack:///./src/start.js?");

/***/ }),

/***/ "./src/utils/corsOpts.js":
/*!*******************************!*\
  !*** ./src/utils/corsOpts.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _url = __webpack_require__(/*! url */ \"url\");\n\n// allow only authorized host (see HOST env var)\nexports.default = function () {\n  return {\n    origin: function origin(ctx) {\n      var referer = ctx.header.referer || 'http://localhost/';\n      return (0, _url.parse)(referer).hostname === process.env.HOST ? '*' : false;\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/utils/corsOpts.js?");

/***/ }),

/***/ "./src/utils/redisOpts.js":
/*!********************************!*\
  !*** ./src/utils/redisOpts.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n// Redis base options\nexports.default = function () {\n  return {\n    host: 'redis',\n    pass: process.env.REDIS_PASSWORD\n  };\n};\n\n//# sourceURL=webpack:///./src/utils/redisOpts.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-bodyparser\");\n\n//# sourceURL=webpack:///external_%22koa-bodyparser%22?");

/***/ }),

/***/ "koa-json":
/*!***************************!*\
  !*** external "koa-json" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-json\");\n\n//# sourceURL=webpack:///external_%22koa-json%22?");

/***/ }),

/***/ "koa-json-filter":
/*!**********************************!*\
  !*** external "koa-json-filter" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-json-filter\");\n\n//# sourceURL=webpack:///external_%22koa-json-filter%22?");

/***/ }),

/***/ "koa-logger":
/*!*****************************!*\
  !*** external "koa-logger" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-logger\");\n\n//# sourceURL=webpack:///external_%22koa-logger%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

/***/ }),

/***/ "koa2-cors":
/*!****************************!*\
  !*** external "koa2-cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa2-cors\");\n\n//# sourceURL=webpack:///external_%22koa2-cors%22?");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-redis-cache":
/*!***************************************!*\
  !*** external "mongoose-redis-cache" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-redis-cache\");\n\n//# sourceURL=webpack:///external_%22mongoose-redis-cache%22?");

/***/ }),

/***/ "mongoose-timestamp":
/*!*************************************!*\
  !*** external "mongoose-timestamp" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-timestamp\");\n\n//# sourceURL=webpack:///external_%22mongoose-timestamp%22?");

/***/ }),

/***/ "moviedb-promise":
/*!**********************************!*\
  !*** external "moviedb-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moviedb-promise\");\n\n//# sourceURL=webpack:///external_%22moviedb-promise%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ })

/******/ });