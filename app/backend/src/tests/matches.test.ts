import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMock from './mock/matches.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint /matches', function() {
  beforeEach(function () { sinon.restore(); });
  //METHOD GET ENDPOINT /matches
  it('Verifica a resposta do método GET na rota /matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.getMatchesResponse.getAll as any);
    
    const httpResponse = await chai
      .request(app)
      .get('/matches')
      .send();

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.getMatchesResponse.getAll);
  });

  it('Verifica a resposta do método GET na rota /matches passando o filtro inProgress=true por query string', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.getMatchesResponse.getAll as any);

    const httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.getMatchesResponse.inProgress);
  });

  it('Verifica a resposta do método GET na rota /matches passando o filtro inProgress=false por query string', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.getMatchesResponse.finished as any);

    const httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.getMatchesResponse.finished);
  });

  //METHOD PATCH ENDPOINT /matches
  it('Verifica a resposta do método PATCH na rota /matches/:id/finish para finalizar uma partida', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves(matchesMock.getMatchesResponse.finished as any);

    const {token} = matchesMock.requestTokenResponse;

    const httpResponse = await chai
      .request(app)
      .patch('/matches/2/finish')
      .set('Authorization', `Bearer ${token}`)
      .send();
    
      expect(httpResponse.body).to.be.deep.equal(matchesMock.patchMatchesResponse.updateFinishedMatch);
      expect(httpResponse.status).to.be.equal(200);
  });

  it('Verifica a resposta do método PATCH na rota /matches/:id para atualizar uma partida em andamento', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves(matchesMock.getMatchesResponse.inProgress as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchesMock.patchMatchesResponse.updateOnGoingMatch as any);

    const {token} = matchesMock.requestTokenResponse;

    const httpResponse = await chai
      .request(app)
      .patch('/matches/2')
      .set('Authorization', `Bearer ${token}`)
      .send(matchesMock.onGoingMatchPatchRequest);
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.patchMatchesResponse.updateOnGoingMatch);
  });

  //METHOD POST ENDPOINT /matches
  it('Verifica a resposta do método POST na rota /matches para adiconar uma partida ao banco de dados', async function() {
    sinon.stub(SequelizeMatch, 'findByPk')
      .onFirstCall()
      .resolves(matchesMock.postMatchesResponse.team1 as any)
      .onSecondCall()
      .resolves(matchesMock.postMatchesResponse.team2 as any);
    sinon.stub(SequelizeMatch, 'create').resolves(matchesMock.postMatchesResponse.valid as any);
    
    const { token } = matchesMock.requestTokenResponse;

    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(matchesMock.postMatchesRequest.valid);
    
    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.postMatchesResponse.valid);
  });

  it('Verifica a resposta do método POST na rota /matches caso seja fornecido nomes de times iguais', async function() {    
    const { token } = matchesMock.requestTokenResponse;

    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(matchesMock.postMatchesRequest.sameTeams);
      
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.postMatchesResponse.sameTeams);
  });

  it('Verifica a resposta do método POST na rota /matches caso algum time fornecido não esteja cadastrado', async function() {
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
