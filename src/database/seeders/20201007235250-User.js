module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users',
      [
        {
          username: 'usuario_animador1',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador1@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador2',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador2@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador3',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador3@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador4',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador4@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador5',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador5@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador6',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador5@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador7',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador5@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador8',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador5@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador9',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador5@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_animador10',
          // pass: 123456
          password: '$2a$10$zEKk5HE9EfjLCLju76FJ8OroBW29a26tChiJZFwp.PIyURZNBE3OO',
          email: 'animador5@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_cliente1',
          // pass: 123456
          password: '$2a$10$Dki9lmawR6shS4ZcH9to/OLMKfQEMese8VfJv1/ri.t8Yp8bT2S6m',
          email: 'cliente@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'usuario_cliente2',
          // pass: 123456
          password: '$2a$10$Dki9lmawR6shS4ZcH9to/OLMKfQEMese8VfJv1/ri.t8Yp8bT2S6m',
          email: 'cliente2@email.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {
        validate: true,
        individualHooks: true,
      });
  },

  down: async () => { },

};
