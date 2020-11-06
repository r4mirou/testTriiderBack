import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import Query from './query';
import Mutation from './mutation';

import { availabilityTypes } from './resources/availability/availability.schema';
import { eventTypes } from './resources/event/event.schema';
import { calendarTypes } from './resources/calendar/calendar.schema';
import { serviceUserCostTypes } from './resources/serviceUserCost/serviceUserCost.schema';
import { serviceUserTypes } from './resources/serviceUser/serviceUser.schema';
import { serviceTypeTypes } from './resources/serviceType/serviceType.schema';
import { roleUserTypes } from './resources/roleUser/roleUser.schema';
import { roleTypeTypes } from './resources/roleType/roleType.schema';
import { profileUserTypes } from './resources/profileUser/profileUser.schema';
import { tokenTypes } from './resources/token/token.schema';
import { userTypes } from './resources/user/user.schema';

import availabilityResolvers from './resources/availability/availability.resolver';
import eventResolvers from './resources/event/event.resolver';
import calendarResolvers from './resources/calendar/calendar.resolver';
import serviceUserCostResolvers from './resources/serviceUserCost/serviceUserCost.resolver';
import serviceUserResolvers from './resources/serviceUser/serviceUser.resolver';
import serviceTypeResolvers from './resources/serviceType/serviceType.resvolver';
import roleUserResolvers from './resources/roleUser/roleUser.resolver';
import roleTypeResolvers from './resources/roleType/roleType.resolver';
import profileUserResolvers from './resources/profileUser/profileUser.resolver';
import tokenResolvers from './resources/token/token.resolver';
import userResolvers from './resources/user/user.resolver';

const resolvers = merge(
  availabilityResolvers,
  eventResolvers,
  calendarResolvers,
  serviceUserCostResolvers,
  serviceUserResolvers,
  serviceTypeResolvers,
  roleUserResolvers,
  roleTypeResolvers,
  profileUserResolvers,
  tokenResolvers,
  userResolvers,
);

const SchemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation       
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    eventTypes,
    calendarTypes,
    availabilityTypes,
    serviceUserCostTypes,
    serviceUserTypes,
    serviceTypeTypes,
    roleUserTypes,
    roleTypeTypes,
    profileUserTypes,
    tokenTypes,
    userTypes,
  ],
  resolvers,
});
