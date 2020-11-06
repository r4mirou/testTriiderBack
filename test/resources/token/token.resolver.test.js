import {
  server,
  db,
  handleError,
  chai,
  expect,
  destroyAll,
} from '../../test-utils';

//eslint-disable-next-line
describe('Token - Resolvers', () => {

  ///////////////////////////////////////////////////////////////////////
  //----------------------------- INIT  ------------------------------ //
  ///////////////////////////////////////////////////////////////////////
  //#region -- Initial Load --

  const validUsername = 'userTest1';
  const validEmail = 'teste1@email.com';
  const validPass = '123456';

  const invalidUsername = 'invalidUsername';
  const invalidEmail = 'invalid@email.com';
  const invalidPass = 'invalid12345';

  //eslint-disable-next-line
  beforeEach(async () => db.User.create(
    {
      username: 'userTest1',
      email: 'teste1@email.com',
      password: '123456',
    },
  ));

  //eslint-disable-next-line
  afterEach(async () => {
    await destroyAll();
  });

  //#endregion

  ///////////////////////////////////////////////////////////////////////
  //--------------------------- MUTATIONS  --------------------------- //
  ///////////////////////////////////////////////////////////////////////
  //#region  -- Mutations --

  //eslint-disable-next-line
  describe('Mutations', () => {

    //#region  -- createToken --

    //eslint-disable-next-line
    describe('createToken', () => {

      //#region -- Should return a new valid Token using Email for login --

      //eslint-disable-next-line
      it('Should return a new valid Token using Email for login', () => {

        const body = {
          query: `
            mutation createNewToken($login: String!, $password: String!) {
              createToken(login: $login, password: $password) {
                token
              }
            }`,
          variables: {
            login: validEmail,
            password: validPass,
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body.data).to.be.key('createToken');
            expect(res.body.data.createToken).to.have.key('token');
            expect(res.body.data.createToken).to.be.string; //eslint-disable-line 
            expect(res.body.errors).to.be.undefined; //eslint-disable-line
          })
          .catch(handleError);
      });

      //#endregion

      //#region -- Should return a new valid Token using Username for login --

      //eslint-disable-next-line
      it('Should return a new valid token using Username for login', () => {

        const body = {
          query: `
            mutation createNewToken($login: String!, $password: String!) {
              createToken(login: $login, password: $password) {
                token
              }
            }`,
          variables: {
            login: validUsername,
            password: validPass,
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body.data).to.be.key('createToken');
            expect(res.body.data.createToken).to.have.key('token');
            expect(res.body.data.createToken).to.be.string; //eslint-disable-line
            expect(res.body.errors).to.be.undefined; //eslint-disable-line
          })
          .catch(handleError);
      });

      //#endregion

      //#region -- Should return an error if the Password is incorrect

      //eslint-disable-next-line
      it('Should return an error if the Password is incorrect', () => {

        const body = {
          query: `
            mutation createNewToken($login: String!, $password: String!) {
              createToken(login: $login, password: $password) {
                token
              }
            }`,
          variables: {
            login: validEmail,
            password: invalidPass,
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body).to.have.keys(['data', 'errors']);
            expect(res.body.data).to.be.key('createToken');
            expect(res.body.data.createToken).to.be.null; //eslint-disable-line
            expect(res.body.errors).to.be.an('array').with.length(1);
            expect(res.body.errors[0].message).to.be.equal('Unauthorized, wrong email/username or password!');
          })
          .catch(handleError);
      });

      //#endregion

      //#region -- Should return an error if the Email is incorrect --

      //eslint-disable-next-line
      it('Should return an error if the Email is incorrect', () => {

        const body = {
          query: `
            mutation createNewToken($login: String!, $password: String!) {
              createToken(login: $login, password: $password) {
                token
              }
            }`,
          variables: {
            login: invalidEmail,
            password: validPass,
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body).to.have.keys(['data', 'errors']);
            expect(res.body.data).to.be.key('createToken');
            expect(res.body.data.createToken).to.be.null; //eslint-disable-line
            expect(res.body.errors).to.be.an('array').with.length(1);
            expect(res.body.errors[0].message).to.be.equal('Unauthorized, wrong email/username or password!');
          })
          .catch(handleError);
      });

      //#endregion

      //#region -- Should return an error if the Username is incorrect --

      //eslint-disable-next-line
      it('Should return an error if the Username is incorrect', () => {

        const body = {
          query: `
            mutation createNewToken($login: String!, $password: String!) {
              createToken(login: $login, password: $password) {
                token
              }  
            }`,
          variables: {
            login: invalidUsername,
            password: validPass,
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body).to.have.keys(['data', 'errors']);
            expect(res.body.data).to.be.key('createToken');
            expect(res.body.data.createToken).to.be.null; //eslint-disable-line
            expect(res.body.errors).to.be.an('array').with.length(1);
            expect(res.body.errors[0].message).to.be.equal('Unauthorized, wrong email/username or password!');
          })
          .catch(handleError);
      });

      //#endregion
    });

    //#endregion
  });

  //#endregion
});
