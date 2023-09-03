const finishMatchInformation = [
  {
    "id": 1,
    "teamName": "Santos",
    "homeMatches": [{
        id: 1,
        homeTeamId: 1,
        homeTeamGoals: 2,
        awayTeamId: 2,
        awayTeamGoals: 0,
        inProgress: false
      }, {
        id: 2,
        homeTeamId: 1,
        homeTeamGoals: 3,
        awayTeamId: 3,
        awayTeamGoals: 1,
        inProgress: false
      }],
    "awayMatches": [{
        id: 3,
        homeTeamId: 2,
        homeTeamGoals: 1,
        awayTeamId: 1,
        awayTeamGoals: 1,
        inProgress: false
      }, {
        id: 5,
        homeTeamId: 3,
        homeTeamGoals: 0,
        awayTeamId: 1,
        awayTeamGoals: 1,
        inProgress: false
      }],
  }, {
    "id": 2,
    "teamName": "Palmeiras",
    "homeMatches": [{
        id: 3,
        homeTeamId: 2,
        homeTeamGoals: 1,
        awayTeamId: 1,
        awayTeamGoals: 1,
        inProgress: false
      }, {
        id: 4,
        homeTeamId: 2,
        homeTeamGoals: 2,
        awayTeamId: 3,
        awayTeamGoals: 1,
        inProgress: false
      }],
    "awayMatches": [{
        id: 1,
        homeTeamId: 1,
        homeTeamGoals: 2,
        awayTeamId: 2,
        awayTeamGoals: 0,
        inProgress: false
      }, {
        id: 6,
        homeTeamId: 3,
        homeTeamGoals: 0,
        awayTeamId: 2,
        awayTeamGoals: 0,
        inProgress: false
      }],
  }, {
    "id": 3,
    "teamName": "Botafogo",
    "homeMatches": [{
        id: 5,
        homeTeamId: 3,
        homeTeamGoals: 0,
        awayTeamId: 1,
        awayTeamGoals: 1,
        inProgress: false
      }, {
        id: 6,
        homeTeamId: 3,
        homeTeamGoals: 0,
        awayTeamId: 2,
        awayTeamGoals: 0,
        inProgress: false
      }],
    "awayMatches": [{
        id: 2,
        homeTeamId: 1,
        homeTeamGoals: 3,
        awayTeamId: 3,
        awayTeamGoals: 1,
        inProgress: false
      }, {
        id: 4,
        homeTeamId: 2,
        homeTeamGoals: 2,
        awayTeamId: 3,
        awayTeamGoals: 1,
        inProgress: false
      }],
  },
]

const getResponse = {
  homeMatches: [{
      "name": "Santos",
      "totalPoints": 6,
      "totalGames": 2,
      "totalVictories": 2,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 5,
      "goalsOwn": 1,
      "goalsBalance": 4,
      "efficiency": "100.00"
    },{
      "name": "Palmeiras",
      "totalPoints": 4,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 3,
      "goalsOwn": 2,
      "goalsBalance": 1,
      "efficiency": "66.67"
    },{
      "name": "Botafogo",
      "totalPoints": 1,
      "totalGames": 2,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 0,
      "goalsOwn": 1,
      "goalsBalance": -1,
      "efficiency": "16.67"
    }],
  awayMatches: [{
    "name": "Santos",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 1,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },{
    "name": "Palmeiras",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 0,
    "goalsOwn": 2,
    "goalsBalance": -2,
    "efficiency": "16.67"
  },{
    "name": "Botafogo",
    "totalPoints": 0,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 2,
    "goalsFavor": 2,
    "goalsOwn": 5,
    "goalsBalance": -3,
    "efficiency": "0.00"
  }],
  allmatches: [{
    "name": "Santos",
    "totalPoints": 10,
    "totalGames": 4,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 2,
    "goalsBalance": 5,
    "efficiency": "83.33"
  },{
    "name": "Palmeiras",
    "totalPoints": 5,
    "totalGames": 4,
    "totalVictories": 1,
    "totalDraws": 2,
    "totalLosses": 1,
    "goalsFavor": 3,
    "goalsOwn": 4,
    "goalsBalance": -1,
    "efficiency": "41.67"
  },{
    "name": "Botafogo",
    "totalPoints": 1,
    "totalGames": 4,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 6,
    "goalsBalance": -4,
    "efficiency": "8.33"
  }],
}

export default {
  finishMatchInformation,
  getResponse,
};
