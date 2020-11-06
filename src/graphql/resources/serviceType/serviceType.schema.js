const serviceTypeTypes = `
  type ServiceType {
    id: ID!
    type: Int!
    description: String!  
    createdAt: String!
    updatedAt: String!
  }  
`;

const serviceTypeQueries = `
  allServiceType: [ ServiceType! ]
  serviceType(id: ID!): ServiceType! 
`;

export {
  serviceTypeTypes,
  serviceTypeQueries,
};
