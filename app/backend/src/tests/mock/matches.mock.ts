
// GET
const getAll = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
];

const inProgress = [
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
];

const finished = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  }
]

const getMatchesResponse = {
  finished,
  inProgress,
  getAll,
};

// PATCH
const updateFinishedMatch = { message: 'Finished'};
const updateOnGoingMatch = { message: 'Done' };

const patchMatchesResponse = {
  updateFinishedMatch,
  updateOnGoingMatch
}

const onGoingMatchPatchRequest = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
};

//POST
const postMatchesRequest = {
  valid: {
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  },
  sameTeams: {
    "homeTeamId": 2,
    "homeTeamGoals": 2,
    "awayTeamId": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  },
  teamNotFound: {
    "homeTeamId": 200,
    "homeTeamGoals": 2,
    "awayTeamId": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  }
}

const postMatchesResponse = {
  valid: {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  },
  sameTeams: { message: 'It is not possible to create a match with two equal teams' },
  teamNotFound: { message: 'There is no team with such id!' },
}

export default {
  getMatchesResponse,
  patchMatchesResponse,
  onGoingMatchPatchRequest,
  postMatchesRequest,
  postMatchesResponse,
}