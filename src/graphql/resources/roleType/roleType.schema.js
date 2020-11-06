const roleTypeTypes = `
  type RoleType {
    id: ID!
    type: Int!
    description: String!  
    createdAt: String!
    updatedAt: String!
  }  
`;

const roleTypeQueries = `
  allRoleType: [ RoleType! ]
  roleType(id: ID!): RoleType! 
`;

export {
  roleTypeTypes,
  roleTypeQueries,
};
