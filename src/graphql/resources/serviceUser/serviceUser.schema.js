const serviceUserTypes = `
  type ServiceUser {
    id: ID!
    fk_user: User!
    fk_service_type: ServiceType!
    createdAt: String!
    updatedAt: String!
    serviceUserCost: ServiceUserCost!
  }  
`;

const serviceUserQueries = `
  currentAllServiceUser: [ ServiceUser! ]
  allServiceUserByService(id: ID!): [ ServiceUser! ]
`;

export {
  serviceUserTypes,
  serviceUserQueries,
};
