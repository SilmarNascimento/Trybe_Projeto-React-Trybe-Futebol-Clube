import jwtUtils from "../../utils/jwt.utils";
import * as bcrypt from 'bcryptjs';

const validPassword = '123456';

const SALT_ROUND = 10;

const userFound = {
  id: 2,
  username: 'Silmar',
  role: 'admin',
  email: 'silmar@trybe.com',
  password: bcrypt.hashSync(validPassword, SALT_ROUND),
}

const requestTokenResponse = {
  token: jwtUtils.sign({ id:userFound.id, username: userFound.username }),
};
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
const updateOnGoingMatch = {
  "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 3,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": true,
};

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
  team1: {
    id: 16,
    teamName: 'São Paulo'
  },
  team2: {
    id: 8,
    teamName: 'Internacional'
  },
  sameTeams: { message: 'It is not possible to create a match with two equal teams' },
  teamNotFound: { message: 'There is no team with such id!' },
}

export default {
  requestTokenResponse,
  getMatchesResponse,
  patchMatchesResponse,
  onGoingMatchPatchRequest,
  postMatchesRequest,
  postMatchesResponse,
}