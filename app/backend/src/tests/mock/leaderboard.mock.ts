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
      "totalPoints": 9,
      "totalGames": 3,
      "totalVictories": 3,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 9,
      "goalsOwn": 3,
      "goalsBalance": 6,
      "efficiency": "100.00"
    },{
      "name": "Santos",
      "totalPoints": 9,
      "totalGames": 3,
      "totalVictories": 3,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 9,
      "goalsOwn": 3,
      "goalsBalance": 6,
      "efficiency": "100.00"
    },{
      "name": "Santos",
      "totalPoints": 9,
      "totalGames": 3,
      "totalVictories": 3,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 9,
      "goalsOwn": 3,
      "goalsBalance": 6,
      "efficiency": "100.00"
    }],
  awayMatches: [{
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },{
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },{
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  }],
  allmatches: [{
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },{
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },{
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  }],
}

export default {
  finishMatchInformation,
  getResponse,
};
