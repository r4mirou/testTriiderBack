module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Events',
      [
        {
          name: 'Festa do Arthur.',
          local_event: 'Rua evento 1',
          block_event: true,
          day_week: 1,
          period: 1,
          fk_calendar: 1,
          date_event: new Date('November 02, 2020 15:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Evento Palhaçadas',
          local_event: 'Endereço s/n',
          block_event: false,
          day_week: 3,
          period: 0,
          fk_calendar: 1,
          date_event: new Date('November 04, 2020 10:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Festa do Joãozinho',
          local_event: 'local evento 3',
          block_event: true,
          day_week: 5,
          period: 0,
          fk_calendar: 1,
          date_event: new Date('November 06, 2020 10:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Evento Triider',
          local_event: 'Park Hub',
          block_event: false,
          day_week: 1,
          period: 1,
          fk_calendar: 1,
          date_event: new Date('November 09, 2020 15:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Boas vindas do Ramiro',
          local_event: 'Park Hub',
          block_event: true,
          day_week: 3,
          period: 0,
          fk_calendar: 1,
          date_event: new Date('November 11, 2020 10:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Festa do Juninho',
          local_event: 'Rua evento 4',
          block_event: true,
          day_week: 2,
          period: 1,
          fk_calendar: 1,
          date_event: new Date('November 17, 2020 15:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Evento Curso',
          local_event: 'Rua evento 5',
          block_event: false,
          day_week: 3,
          period: 1,
          fk_calendar: 1,
          date_event: new Date('November 18, 2020 15:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Evento teste',
          local_event: 'Rua evento 6',
          block_event: false,
          day_week: 1,
          period: 1,
          fk_calendar: 1,
          date_event: new Date('November 23, 2020 15:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Evento teste2',
          local_event: 'Rua evento 6',
          block_event: false,
          day_week: 5,
          period: 0,
          fk_calendar: 1,
          date_event: new Date('November 27, 2020 15:30:00 GMT'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface) => queryInterface.bulkDelete('Events', null, {}),
};
