import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMock from './mock/matches.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint /leaderboard', function() {
  beforeEach(function () { sinon.restore(); });
  //METHOD GET ENDPOINT /leaderboard/home
  it('Verifica a resposta do método GET na rota /leaderboard/home', async function() {
    sinon.stub(SequelizeMatch, 'findAll')
      .resolves(matchesMock.postMatchesResponse.team1 as any);

    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.postMatchesResponse.teamNotFound);
  });
});
