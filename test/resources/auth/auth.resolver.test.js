import * as jwt from 'jsonwebtoken';
import {
  server,
  db,
  handleError,
  chai,
  expect,
  destroyAll,
} from '../../test-utils';

//eslint-disable-next-line
describe('Auth - Resolvers', () => {

  ///////////////////////////////////////////////////////////////////////
  //----------------------------- INIT  ------------------------------ //
  ///////////////////////////////////////////////////////////////////////
  //#region -- Initial Load --

  let userId;
  let token;

  let withoutUserId;
  let withoutUserToken;

  //eslint-disable-next-line
  beforeEach(async () => db.User.bulkCreate([
    {
      username: 'user_test1',
      email: 'teste1@email.com',
      password: '12345',
    },
    {
      username: 'user_test2',
      email: 'teste2@email.com',
      password: '12345',
    },
  ], { returning: true })
    .then((users) => {
      userId = users[0].get('id');
      const payload = { sub: userId };
      token = jwt.sign(payload, process.env.JWT_ENV);

      withoutUserId = users[1].get('id');
      const withoutUserPayload = { sub: withoutUserId };
      withoutUserToken = jwt.sign(withoutUserPayload, process.env.JWT_ENV);
    }).then(() => {
      db.User.destroy({ where: { id: withoutUserId } });
    }));

  //eslint-disable-next-line
  afterEach(async () => {
    await destroyAll();
  });

  //#endregion

  ///////////////////////////////////////////////////////////////////////
  //------------------------- Authentication  ------------------------- //
  ///////////////////////////////////////////////////////////////////////
  //#region  -- Authentication Test --

  //eslint-disable-next-line
  describe('Authentication', () => {

    //#region -- updateCurrentUser --

    //eslint-disable-next-line
    describe('updateCurrentUser', () => {

      //#region -- Should update an existing User --

      //eslint-disable-next-line
      it('Should update an existing User', () => {

        const body = {
          query: `
            mutation updateExistingUser($input: UserUpdateInput!) {
              updateCurrentUser(input: $input) {
                username
                email
              }
            }`,
          variables: {
            input: {
              username: 'userUpdated',
              email: 'updated@email.com',
            },
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send(JSON.stringify(body))
          .then((res) => {
            const updatedUser = res.body.data.updateCurrentUser;
            expect(updatedUser).to.be.an('object');
            expect(updatedUser.username).to.equal('userUpdated');
            expect(updatedUser.email).to.equal('updated@email.com');
            expect(updatedUser.id).to.be.undefined; //eslint-disable-line
          })
          .catch(handleError);
      });

      //#endregion

      //#region -- Should block operation if token is invalid --

      //eslint-disable-next-line
      it('Should block operation if token is invalid', () => {

        const body = {
          query: `
            mutation updateExistingUser($input: UserUpdateInput!) {
              updateCurrentUser(input: $input) {
                username
                email
              }
            }`,
          variables: {
            input: {
              username: 'userUpdated',
              email: 'updated@email.com',
            },
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', 'Bearer INVALID_TOKEN')
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body.data).to.be.null; //eslint-disable-line
            expect(res.body).to.have.keys(['data', 'errors']);
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors[0].message).to.equal('Unauthorized! Invalid token.');
          })
          .catch(handleError);
      });

      //#endregion

      //#region -- Should block operation if token is not provide --

      //eslint-disable-next-line
      it('Should block operation if token is not provide', () => {

        const body = {
          query: `
            mutation updateExistingUser($input: UserUpdateInput!) {
              updateCurrentUser(input: $input) {
                username
                email
              }
            }`,
          variables: {
            input: {
              username: 'user updated',
              email: 'updated@email.com',
            },
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', 'Bearer ')
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body.data).to.be.null; //eslint-disable-line
            expect(res.body).to.have.keys(['data', 'errors']);
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors[0].message).to.equal('Unauthorized! Token not provided.');
          })
          .catch(handleError);
      });

      //#endregion

      //#region -- Should block operation if the user does not exist --

      //eslint-disable-next-line
      it('Should block operation if the user does not exist', () => {

        const body = {
          query: `
            mutation updateExistingUser($input: UserUpdateInput!) {
              updateCurrentUser(input: $input) {
                username
                email
              }
            }`,
          variables: {
            input: {
              username: 'userUpdated',
              email: 'updated@email.com',
            },
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', `Bearer ${withoutUserToken}`)
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body.data).to.be.null; //eslint-disable-line
            expect(res.body).to.have.keys(['data', 'errors']);
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors[0].message).to.equal('Unauthorized! User token not found.');
          })
          .catch(handleError);
      });

      //#endregion
    });

    //#endregion
  });

  //#endregion
});
