const calendarTypes = `
  type Calendar {
    id: ID!
    fk_user: User!
    createdAt: String!
    updatedAt: String!
    events: [ Event! ]
    availabilities: [ Availability! ]
  }  
`;

const calendarQueries = `
  allCalendarByCurrentUser: [ Calendar! ]
`;

export {
  calendarTypes,
  calendarQueries,
};
