import { availabilityQueries } from './resources/availability/availability.schema';
import { eventQueries } from './resources/event/event.schema';
import { calendarQueries } from './resources/calendar/calendar.schema';
import { serviceUserCostQueries } from './resources/serviceUserCost/serviceUserCost.schema';
import { serviceUserQueries } from './resources/serviceUser/serviceUser.schema';
import { serviceTypeQueries } from './resources/serviceType/serviceType.schema';
import { roleUserQueries } from './resources/roleUser/roleUser.schema';
import { roleTypeQueries } from './resources/roleType/roleType.schema';
import { profileUserQueries } from './resources/profileUser/profileUser.schema';
import { userQueries } from './resources/user/user.schema';

export default `
  type Query {
    ${availabilityQueries}
    ${eventQueries}
    ${calendarQueries}
    ${serviceUserCostQueries}
    ${serviceUserQueries}
    ${serviceTypeQueries}
    ${roleUserQueries}
    ${roleTypeQueries}
    ${profileUserQueries}
    ${userQueries}
  }
`;
