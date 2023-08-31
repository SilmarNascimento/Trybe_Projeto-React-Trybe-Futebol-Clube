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
  it('Verifica a resposta do método GET na rota /leaderboard/home caso algum time fornecido não esteja cadastrado', async function() {
    sinon.stub(SequelizeMatch, 'findByPk')
      .onFirstCall()
      .resolves(matchesMock.postMatchesResponse.team1 as any)
      .onSecondCall()
      .resolves(null);

    const { token } = matchesMock.requestTokenResponse;

    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(matchesMock.postMatchesRequest.teamNotFound);
    
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.postMatchesResponse.teamNotFound);
  });
});
