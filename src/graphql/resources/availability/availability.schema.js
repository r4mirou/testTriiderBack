const availabilityTypes = `
  type Availability {
    id: ID!
    sunday: Boolean!
    monday: Boolean!
    tuesday: Boolean!
    wednesday: Boolean!
    thursday: Boolean!
    friday: Boolean!
    saturday: Boolean!
    morning: Boolean!
    afternoon: Boolean!
    night: Boolean!
    fk_calendar: Calendar!
    createdAt: String!
    updatedAt: String!
    binary: String!
  }  
`;

const availabilityQueries = `
  availabilities: Availability!
`;

export {
  availabilityTypes,
  availabilityQueries,
};
