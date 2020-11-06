const eventTypes = `
  type Event {
    id: ID!
    name: String!
    date_event: String!
    local_event: String!
    block_event: Boolean!
    day_week: Int!
    period: Int!
    fk_calendar: Calendar!
    createdAt: String!
    updatedAt: String!
  }  

  input EventCreateInput {
    name: String!
    date: String!
    local: String!
    period: Int!
    block: Boolean!
}
`;

const eventQueries = `  
  events(initial: String!, final: String!): [ Event! ]
`;

const eventMutations = `
  createEvent(input: EventCreateInput!): Event!    
`;

export {
  eventTypes,
  eventQueries,
  eventMutations,
};
