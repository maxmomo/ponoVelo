const express = require('express');
const router = express.Router();

const {createUser} = require('../controllers/users/createUser');
const {connectUser} = require('../controllers/users/connectUser');
const {getTeams} = require('../controllers/teams/getTeams');
const {getRidersTeam} = require('../controllers/riders/getRidersTeam');
const {getHistoryTeam} = require('../controllers/history/getHistoryTeam');
const {getStatisticsTeam} = require('../controllers/statistic/getStatisticsTeam');
const {getStatisticsTeamRace} = require('../controllers/statistic/getStatisticsTeamRace');
const {createLeague} = require('../controllers/league/createLeague');
const {getLeaguesUser} = require('../controllers/user/getLeaguesUser');
const {joinLeague} = require('../controllers/league/joinLeague');
const {getUserRidersOffer} = require('../controllers/ridersOffers/getUserRidersOffers');
const {getUserRidersOfferMercato} = require('../controllers/ridersOffers/getUserRidersOffersMercato');
const {createUserRidersOffers} = require('../controllers/ridersOffers/createUserRidersOffers');
const {deleteUserRidersOffers} = require('../controllers/ridersOffers/deleteUserRidersOffers');
const {getRiders} = require('../controllers/riders/getRiders');
const {getNextRace} = require('../controllers/races/getNextRace');
const {getStagesRace} = require('../controllers/stages/getStagesRace');
const {getStartListRace} = require('../controllers/startlist/getStartlistRace');
const {getUsersLeague} = require('../controllers/league/getUsersLeague');
const {getBetsUserRace} = require('../controllers/bet/getBetsUserRace');
const {setBetsUserRace} = require('../controllers/bet/setBetsUserRace');
const {getUserRidersLeague} = require('../controllers/userRiders/getUserRidersLeague');
const {getPrediction} = require('../controllers/prediction/getPrediction');
const {getTotalUserLeague} = require('../controllers/league/getTotalUserLeague');
const {getHistoryRidersOffer} = require('../controllers/ridersOffers/getHistoryRidersOffer');

router.get("/users/create", createUser)
router.get("/users/connect", connectUser)
router.get("/user/leagues", getLeaguesUser)

router.get("/teams/all", getTeams)

router.get("/riders/all", getRiders)

router.get("/team/riders", getRidersTeam)
router.get("/team/history", getHistoryTeam)
router.get("/team/statistics", getStatisticsTeam)
router.get("/team/race/statistics", getStatisticsTeamRace)

router.get("/league/create", createLeague)
router.get("/league/join", joinLeague)
router.get("/league/users", getUsersLeague)
router.get("/league/user/riders", getUserRidersLeague)
router.get("/league/user/total", getTotalUserLeague)

router.get("/ridersOffers/user", getUserRidersOffer)
router.get("/ridersOffersMercato/user", getUserRidersOfferMercato)
router.get("/ridersOffers/user/create", createUserRidersOffers)
router.get("/ridersOffers/user/delete", deleteUserRidersOffers)
router.get("/ridersOffers/history", getHistoryRidersOffer)

router.get("/race/next", getNextRace)
router.get("/race/stages", getStagesRace)
router.get("/race/startlist", getStartListRace)
router.get("/race/user/bets", getBetsUserRace)
router.get("/race/user/bets/set", setBetsUserRace)

router.get("/stage/prediction", getPrediction)

module.exports = router