import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import leaderboardMock from './mock/leaderboard.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint /leaderboard', function() {
  beforeEach(function () { sinon.restore(); });
  //METHOD GET ENDPOINT /leaderboard/home
  it('Verifica a resposta do método GET na rota /leaderboard/home', async function() {
    sinon.stub(SequelizeTeam, 'findAll')
      .resolves(leaderboardMock.finishMatchInformation as any);

    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(leaderboardMock.getResponse.homeMatches);
  });

  //METHOD GET ENDPOINT /leaderboard/away
  it('Verifica a resposta do método GET na rota /leaderboard/away', async function() {
    sinon.stub(SequelizeTeam, 'findAll')
      .resolves(leaderboardMock.finishMatchInformation as any);

    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(leaderboardMock.getResponse.awayMatches);
  });

  //METHOD GET ENDPOINT /leaderboard
  it('Verifica a resposta do método GET na rota /leaderboard', async function() {
    sinon.stub(SequelizeTeam, 'findAll')
      .resolves(leaderboardMock.finishMatchInformation as any);

    const httpResponse = await chai
      .request(app)
      .get('/leaderboard')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(leaderboardMock.getResponse.allmatches);
  });
});
