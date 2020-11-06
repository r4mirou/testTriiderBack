const userTypes = `
  type User {
    id: ID!
    username: String!    
    email: String!    
    createdAt: String!
    updatedAt: String!
    profileUser: ProfileUser!
    roleUser: [ RoleUser! ]!
    serviceUser: [ ServiceUser! ]
    calendar: Calendar!
  }

  input UserCreateInput {
    username: String!
    email: String!
    password: String!
    roleUser: ID!
  }

  input UserUpdateInput {
    username: String!
    email: String!
  }

  input UserUpdatePasswordInput {
      password: String!
  }
`;

const userQueries = `
    currentUser:User!
`;

const userMutations = `
    createUser(input: UserCreateInput!): User!    
    updateCurrentUser(input: UserUpdateInput!): User!
    updateCurrentUserPassword(input: UserUpdatePasswordInput!): Boolean!
    deleteCurrentUser: Boolean!
`;

export {
  userTypes,
  userQueries,
  userMutations,
};
