import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMock from './mock/matches.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint /teams', function() {
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
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.getMatchesResponse.inProgress as any);

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
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchesMock.getMatchesResponse.inProgress as any);

    const httpResponse = await chai
      .request(app)
      .patch('/matches/2/finish')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.patchMatchesResponse.updateFinishedMatch);
  });

  it('Verifica a resposta do método PATCH na rota /matches/:id para atualizar uma partida em andamento', async function() {
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchesMock.getMatchesResponse.inProgress as any);

    const httpResponse = await chai
      .request(app)
      .patch('/matches/2')
      .send(matchesMock.onGoingMatchPatchRequest);
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.patchMatchesResponse.updateOnGoingMatch);
  });

  //METHOD PATCH ENDPOINT /matches
  it('Verifica a resposta do método POST na rota /matches para adiconar uma partida ao banco de dados', async function() {
    sinon.stub(SequelizeMatch, 'create').resolves(matchesMock.postMatchesResponse.valid as any);

    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .send(matchesMock.postMatchesRequest.valid);
    
    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.postMatchesResponse.valid);
  });

  it('Verifica a resposta do método POST na rota /matches caso seja fornecido nomes de times iguais', async function() {
    const httpResponse = await chai
      .request(app)
      .patch('/matches')
      .send(matchesMock.postMatchesRequest.sameTeams);
    
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.postMatchesResponse.sameTeams);
  });

  it('Verifica a resposta do método POST na rota /matches caso algum time fornecido não esteja cadastrado', async function() {
    const httpResponse = await chai
      .request(app)
      .patch('/matches')
      .send(matchesMock.postMatchesRequest.teamNotFound);
    
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal(matchesMock.postMatchesResponse.teamNotFound);
  });
});
