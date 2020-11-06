import { eventMutations } from './resources/event/event.schema';
import { profileUserMutations } from './resources/profileUser/profileUser.schema';
import { tokenMutations } from './resources/token/token.schema';
import { userMutations } from './resources/user/user.schema';

export default `
  type Mutation {
    ${eventMutations}
    ${profileUserMutations}
    ${tokenMutations}
    ${userMutations}
  }
`;
