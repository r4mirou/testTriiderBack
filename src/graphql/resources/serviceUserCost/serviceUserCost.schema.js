const serviceUserCostTypes = `
  type ServiceUserCost {
    id: ID!
    cost: Float!
    fk_service_user: ServiceUser!
    createdAt: String!
    updatedAt: String!
  }  
`;

const serviceUserCostQueries = `
  serviceUserCostByService(id: ID!): ServiceUserCost!
`;

export {
  serviceUserCostTypes,
  serviceUserCostQueries,
};
