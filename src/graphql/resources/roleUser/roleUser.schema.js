const roleUserTypes = `
  type RoleUser {
    id: ID!
    fk_user: User!
    fk_role_type: RoleType!
    createdAt: String!
    updatedAt: String!
  }  
`;

const roleUserQueries = `
  currentAllRoleUser: [ RoleUser! ]
`;

export {
  roleUserTypes,
  roleUserQueries,
};
