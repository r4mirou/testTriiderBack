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
describe('User - Resolvers', () => {

  ///////////////////////////////////////////////////////////////////////
  //----------------------------- INIT  ------------------------------ //
  ///////////////////////////////////////////////////////////////////////
  //#region -- Initial Load --

  let userId;
  let token;

  let withoutProfileUserId;
  let withoutProfileUserToken;

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
    .then((user) => {
      userId = user[0].get('id');
      const payload = { sub: userId };
      token = jwt.sign(payload, process.env.JWT_ENV);

      withoutProfileUserId = user[1].get('id');
      const withoutProfilePayload = { sub: withoutProfileUserId };
      withoutProfileUserToken = jwt.sign(withoutProfilePayload, process.env.JWT_ENV);
    }).then(() => db.ProfileUser.create({
      name: 'profile test',
      fk_user: userId,
    }, { returning: true }))
    .then(() => db.RoleType.create({
      type: 1,
      description: 'Animador',
    }, { returning: true }))
    .then((roleType) => db.RoleUser.create({
      fk_role_type: roleType.id,
      fk_user: userId,
    }, { returning: true })));

  //eslint-disable-next-line
  afterEach(async () => {
    await destroyAll();
  });

  //#endregion

  ///////////////////////////////////////////////////////////////////////
  //---------------------------- QUERIES  ---------------------------- //
  ///////////////////////////////////////////////////////////////////////
  //#region -- Queries --

  //eslint-disable-next-line
  describe('Queries', () => {

    //#region -- currentUser --

    //eslint-disable-next-line
    describe('currentUser', () => {

      //#region -- Should return the current User by Token --

      //eslint-disable-next-line
      it('Should return the current User by Token', () => {
        const body = {
          query: `
            query {
              currentUser{
                id
                username
                email
                profileUser{
                  id
                  name
                  about
                }
              }
            }`,
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send(JSON.stringify(body))
          .then((res) => {
            const singleUser = res.body.data.currentUser;
            expect(res.body.data).to.be.an('object');
            expect(singleUser).to.be.an('object');
            expect(singleUser).to.have.keys(['id', 'username', 'email', 'profileUser']);
            expect(singleUser.username).to.equal('user_test1');
            expect(singleUser.email).to.equal('teste1@email.com');
            expect(singleUser.profileUser).to.be.an('object');
            expect(singleUser.profileUser).to.have.keys(['id', 'name', 'about']);
            expect(singleUser.profileUser.name).to.equal('profile test');
            expect(singleUser.profileUser.about).to.equal(null);
          })
          .catch(handleError);
      });

      //#endregion
    });

  //#endregion
  });

  //#endregion

  ///////////////////////////////////////////////////////////////////////
  //--------------------------- MUTATIONS  --------------------------- //
  ///////////////////////////////////////////////////////////////////////
  //#region  -- Mutations --

  // eslint-disable-next-line
  describe('Mutations', () => {

    //#region -- createUser --

    // eslint-disable-next-line
    describe('createUser', () => {

      //#region  -- Should create a new User --

      // eslint-disable-next-line
      it('Should create a new User', () => {

        const body = {
          query: `
            mutation createNewUser($input: UserCreateInput!) {
              createUser(input: $input) {
                id
                username
                email
              }
            }`,
          variables: {
            input: {
              username: 'userCreated',
              email: 'created@email.com',
              password: '1234556',
              roleUser: 1,
            },
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .send(JSON.stringify(body))
          .then((res) => {
            const createdUser = res.body.data.createUser;
            expect(createdUser).to.be.an('object');
            expect(createdUser.username).to.equal('userCreated');
            expect(createdUser.email).to.equal('created@email.com');
            expect(parseInt(createdUser.id, 10)).to.be.a('number');
          })
          .catch(handleError);
      });

      //#endregion
    });

    //#endregion

    //#region -- updateCurrentUser --

    // eslint-disable-next-line
    describe('updateCurrentUser', () => {

      //#region -- Should update an existing User --

      // eslint-disable-next-line
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
            expect(updatedUser.id).to.be.undefined; // eslint-disable-line
          })
          .catch(handleError);
      });

      //#endregion
    });

    //#endregion

    //#region -- updateCurrentUserPassword --

    // eslint-disable-next-line
    describe('updateCurrentUserPassword', () => {

      //#region  -- Should update the Password of an existing User --

      // eslint-disable-next-line
      it('Should update the Password of an existing User', () => {

        const body = {
          query: `
            mutation updateUserPassword($input: UserUpdatePasswordInput!) {
              updateCurrentUserPassword(input: $input)
            }`,
          variables: {
            input: {
              password: 'newPass123',
            },
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body.data.updateCurrentUserPassword).to.be.true; // eslint-disable-line
          })
          .catch(handleError);
      });

      //#endregion
    });

    //#endregion

    //#region -- deleteCurrentUser --

    // eslint-disable-next-line
    describe('deleteCurrentUser', () => {

      //#region -- Should delete an existing User --

      // eslint-disable-next-line
      it('Should delete an existing User', () => {

        const body = {
          query: `
            mutation {
              deleteCurrentUser
            }`,
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send(JSON.stringify(body))
          .then((res) => {
            expect(res.body.data.deleteCurrentUser).to.be.true; // eslint-disable-line
          })
          .catch(handleError);
      });

      //#endregion

      // eslint-disable-next-line
      //#region  -- Should return an error, trying to delete the current User without a associated ProfileUser --

      // eslint-disable-next-line
      it('Should return an error, trying to delete the current User without a associated ProfileUser', () => {
        const body = {
          query: `
            mutation {
              deleteCurrentUser
            }`,
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', `Bearer ${withoutProfileUserToken}`)
          .send(JSON.stringify(body))
          .then((res) => {
            const errors = res.body.errors; // eslint-disable-line
            expect(res.body.data).to.be.null; // eslint-disable-line
            expect(res.body).to.have.keys(['data', 'errors']);
            expect(errors).to.be.an('array');
            expect(errors[0].message).to.equal('Internal error! At user delete.');
          })
          .catch(handleError);
      });

      //#endregion
    });

    //#endregion
  });

  //#endregion
});
