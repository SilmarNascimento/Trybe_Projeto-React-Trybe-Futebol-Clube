import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser';
import usersMock from './mock/users.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint /login', function() {
  it('Verifica a resposta do método POST na rota /login sem email e password', async function() {    
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({});

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.emptyRequest);
  });

  it('Verifica a resposta do método POST na rota /login sem email', async function() {    
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: usersMock.validPassword
      });

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.emptyRequest);
  });

  it('Verifica a resposta do método POST na rota /login sem password', async function() {    
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: usersMock.validEmail
      });

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.emptyRequest);
  });

  it('Verifica a resposta do método POST na rota /login com email de formato inválido', async function() {
    const httpResponse = await chai
      .request(app)
      .get('/login')
      .send({
        email: usersMock.invalidEmail.pattern,
        password: usersMock.validPassword,
      });
    
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.invalidRequest);
  });

  it('Verifica a resposta do método POST na rota /login com email de tipo inválido', async function() {
    const httpResponse = await chai
      .request(app)
      .get('/login')
      .send({
        email: usersMock.invalidEmail.type,
        password: usersMock.validPassword,
      });
    
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.invalidRequest);
  });

  it('Verifica a resposta do método POST na rota /login com password de formato inválido', async function() {
    const httpResponse = await chai
      .request(app)
      .get('/login')
      .send({
        email: usersMock.validEmail,
        password: usersMock.invalidPassword.length,
      });
    
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.invalidRequest);
  });

  it('Verifica a resposta do método POST na rota /login com password de tipo inválido', async function() {
    const httpResponse = await chai
      .request(app)
      .get('/login')
      .send({
        email: usersMock.validEmail,
        password: usersMock.invalidPassword.type,
      });
    
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.invalidRequest);
  });

  it('Verifica a resposta do método POST na rota /login com password de tipo inválido', async function() {
    const httpResponse = await chai
      .request(app)
      .get('/login')
      .send({
        email: usersMock.validEmail,
        password: usersMock.invalidPassword.type,
      });
    
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(usersMock.errorMessage.invalidRequest);
  });
});


/* it('Verifica a resposta do método POST na rota /login sem email e password', async function() {
  sinon.stub(SequelizeUser, 'findAll').resolves(teamsMock.dbTeams as any);
  
  const httpResponse = await chai
    .request(app)
    .post('/teams')
    .send();

  expect(httpResponse.status).to.be.equal(200);
  expect(httpResponse.body).to.be.deep.equal(teamsMock.dbTeams);
}); */