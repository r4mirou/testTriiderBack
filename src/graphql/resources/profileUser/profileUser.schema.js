const profileUserTypes = `
  type ProfileUser {
    id: ID!
    name: String!
    about: String    
    createdAt: String!
    updatedAt: String!
    fk_user: User!
  }

  input ProfileUserUpdateInput {
    name: String
    about: String    
}
`;

const profileUserQueries = `
currentProfileUser: ProfileUser!
`;
const profileUserMutations = `
    updateCurrentProfileUser(input: ProfileUserUpdateInput!): ProfileUser!
`;

export {
  profileUserTypes,
  profileUserQueries,
  profileUserMutations,
};
