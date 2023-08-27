import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/SequelizeTeam';
import teamsMock from './mock/teams.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint /teams', function() {
  it('Verifica a resposta do método GET na rota /teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock.dbTeams as any);
    
    const httpResponse = await chai
      .request(app)
      .get('/teams')
      .send();

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.equal(teamsMock.dbTeams);
  });

  it('Verifica a resposta do método GET na rota /teams/:id', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teamsMock.dbTeamById as any);

    const httpResponse = await chai
      .request(app)
      .get('/teams/2')
      .send();
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.equal(teamsMock.dbTeamById);
  })
});
