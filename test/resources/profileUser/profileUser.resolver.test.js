import * as jwt from 'jsonwebtoken';
import {
  server,
  db,
  chai,
  handleError,
  expect,
  destroyAll,
} from '../../test-utils';

// eslint-disable-next-line
describe('ProfileUser - Resolvers', () => {

  ///////////////////////////////////////////////////////////////////////
  //----------------------------- INIT  ------------------------------ //
  //////////////////////////////////////////////////////////////////////

  // #region -- Initial Load --

  let userId;
  let token;

  // eslint-disable-next-line
  beforeEach(async () => db.User.bulkCreate([
    {
      username: 'user_test1',
      email: 'teste1@email.com',
      password: '12345',
    },
    {
      username: 'user_test2',
      email: 'teste2@email.com',
      password: '54321',
    }], { returning: true })
    .then((user) => {
      userId = user[0].get('id');
      const payload = { sub: userId };
      token = jwt.sign(payload, process.env.JWT_ENV);
    }).then(() => db.ProfileUser.bulkCreate([
      {
        name: 'Profile ADM',
        fk_user: userId,
      },
    ], { returning: true })));

  // eslint-disable-next-line
  afterEach(async () => {
    await destroyAll();
  });

  //#endregion

  ///////////////////////////////////////////////////////////////////////
  //---------------------------- QUERIES  ---------------------------- //
  ///////////////////////////////////////////////////////////////////////

  //#region -- Queries --

  // eslint-disable-next-line
  describe('Queries', () => {

    //#region -- currentProfile --

    // eslint-disable-next-line
    describe('currentProfileUser', () => {

      //#region -- Should return the current ProfileUser by Token --

      // eslint-disable-next-line
      it('Should return the current ProfileUser by Token', () => {
        const body = {
          query: `
            query {
              currentProfileUser {
                id
                name
                  fk_user{
                    username
                    email
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
            const singleProfile = res.body.data.currentProfileUser;
            expect(res.body.data).to.be.an('object');
            expect(singleProfile).to.be.an('object');
            expect(singleProfile).to.have.keys(['id', 'name', 'fk_user']);
            expect(parseInt(singleProfile.id, 10)).to.be.a('number');
            expect(singleProfile.name).to.equal('Profile ADM');
            expect(singleProfile.fk_user).to.have.keys(['username', 'email']);
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

    //#region -- updateCurrentProfileUser --

    // eslint-disable-next-line
    describe('updateCurrentProfileUser', () => { 

      //#region -- Should update an existing ProfileUser --

      // eslint-disable-next-line
      it('Should update an existing ProfileUser', () => {

        const body = {
          query: `
            mutation updateExistingProfile($input: ProfileUserUpdateInput!) {
              updateCurrentProfileUser(input: $input) {
                name
                about
                fk_user{
                  id
                  username
                  email
                }
              }
            }`,
          variables: {
            input: {
              name: 'profile updated',
              about: 'about updated',
            },
          },
        };

        return chai.request(server)
          .post('/graphql')
          .set('content-type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send(JSON.stringify(body))
          .then((res) => {
            const updatedProfile = res.body.data.updateCurrentProfileUser;
            expect(updatedProfile).to.be.an('object');
            expect(updatedProfile).to.have.keys(['name', 'about', 'fk_user']);
            expect(parseInt(updatedProfile.id, 10)).to.be.a('number');
            expect(updatedProfile.name).to.equal('profile updated');
            expect(updatedProfile.id).to.be.undefined; // eslint-disable-line
            expect(updatedProfile.fk_user).to.be.an('object');
            expect(updatedProfile.fk_user).to.have.keys(['id', 'username', 'email']);
            expect(parseInt(updatedProfile.fk_user.id)).to.be.a('number'); // eslint-disable-line
            expect(updatedProfile.fk_user.username).to.equal('user_test1');
            expect(updatedProfile.fk_user.email).to.equal('teste1@email.com');
            expect(res.body.errors).to.be.undefined; // eslint-disable-line
          })
          .catch(handleError);
      });

      //#endregion
    });

    //#endregion
  });

  //#endregion
});
