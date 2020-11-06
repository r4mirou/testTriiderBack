import chai from 'chai';
import chaiHttp from 'chai-http';
import Server from '../server';
import db from '../src/database/models';

const serverClass = new Server();
serverClass.startup(4002);
const server = serverClass.server; // eslint-disable-line

chai.use(chaiHttp);
const expect = chai.expect; // eslint-disable-line

const handleError = (error) => {
  const message = (error.response) ? error.response.res.text : error.message || error;
  return Promise.reject(new Error(`${error.name}: ${message}`));
};

const destroyAll = () => db.ProfileUser.destroy(
  { where: {} },
).then(() => db.User.destroy({ where: {} }));

// const destroyAll = () => db.RoleType.destroy({ where: {} })
//   .then(() => db.RoleUser.destroy({ where: {} }))
//   .then(() => db.Profile.destroy({ where: {} }))
//   .then(() => db.User.destroy({ where: {} }));

export {
  server,
  db,
  chai,
  expect,
  handleError,
  destroyAll,
};
