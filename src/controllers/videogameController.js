const Videogames = require("../models/Videogames");
const Users = require("../models/Users");
const orderGames = require("../helpers/orderGames");
const videogameController = {};

videogameController.list = async (req, res, next) => {
  try {
    const list = await Videogames.find({});

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

videogameController.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Videogames.findByIdAndDelete(id);

    res.status(200).json("Deleted successfully");
  } catch (error) {
    next(error);
  }
};

videogameController.add = async (req, res, next) => {
  try {
    const {
      name,
      userId,
      url_image,
      status,
      rating,
      comment,
      position,
      idApi,
    } = req.body;

    const user = await Users.findById(userId);

    const newGame = new Videogames({
      name,
      userId,
      url_image,
      rating,
      status,
      comment,
      position,
      idApi,
    });
    const videogameSaved = await newGame.save();

    //console.log(videogameSaved);

    user.videogames = user.videogames.concat(videogameSaved._id);

    const userSaved = await user.save();

    res.status(201).json({
      message: `${videogameSaved.name} Saved Successfully! ✅`,
      user: userSaved,
    });
  } catch (error) {
    next(error);
  }
};

videogameController.updateList = (req, res, next) => {
  //console.log("Actualizando con nueva versión");
  const userId = req.params.userId;

  const { source, destination, snapgames } = req.body;

  ////console.log(source, destination, snapgames)

  const updateSource = () => {
    return Promise.all(
      snapgames.gamesUser.games[source.droppableId].map((el, index) => {
        return Videogames.findByIdAndUpdate(el.id, {
          position: index,
          status: source.droppableId,
        });
      })
    );
  };
  const updateDestination = () => {
    return Promise.all(
      snapgames.gamesUser.games[destination.droppableId].map((el, index) => {
        return Videogames.findByIdAndUpdate(el.id, {
          position: index,
          status: destination.droppableId,
        });
      })
    );
  };

  Promise.all([updateSource(), updateDestination()])
    .then((items) => {
      //console.log("BD Actualizada");
      res.status(200).json({ message: "Update successfully" });
    })
    .catch((err) => next(err));
};

videogameController.listGamesUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const games = await orderGames(userId);

    //console.log("Comprobando", games);

    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

videogameController.deleteGameUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;

    const gameDeleted = await Videogames.findByIdAndDelete(gameId);

    // const gameDeleted = await Videogames.findById(gameId)

    const status = gameDeleted.status;

    const user = await Users.findById(userId);

    user.videogames = user.videogames.filter((el) => {
      return el.toString() !== gameId;
    });

    const userSaved = await user.save();

    const gamesUpdated = await orderGames(userId);

    if (gamesUpdated[status].length > 0) {
      gamesUpdated[status].forEach(async (el, index) => {
        if (el.position > index) {
          await Videogames.findByIdAndUpdate(el._id, { position: index });
        }
      });
    }

    res.status(200).json({
      message: "Delete successful ✅",
      user: userSaved,
    });
  } catch (error) {
    next(error);
  }
};

videogameController.getGame = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;

    const user = await Users.findById(userId).populate("videogames");

    //console.log(user);

    const game = user.videogames.filter((el) => el._id.toString() === gameId);

    res.status(200).json(game[0]);
  } catch (err) {
    next(err);
  }
};

videogameController.updateGame = async (req, res, next) => {
  try {
    const gameId = req.params.gameId;
    const { rating, comment, status, position } = req.body;
    //console.log(rating, comment, status);

    const gameUpdate = await Videogames.findByIdAndUpdate(gameId, {
      rating,
      status,
      comment,
      position,
    });

    res.status(201).json({ message: "Game Updated successfully ✅" });
  } catch (err) {
    next(err);
  }
};

module.exports = videogameController;
