module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ProfileUsers',
      [
        {
          name: 'Usuário animador 1',
          about: 'Este usuário é: Palhaço.',
          fk_user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 2',
          about: 'Este usuário é: Malabarista.',
          fk_user: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 3',
          about: 'Este usuário é: Mágico.',
          fk_user: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 4',
          about: 'Este usuário é: Palhaço.',
          fk_user: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 5',
          about: 'Este usuário é: Malabarista.',
          fk_user: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 6',
          about: 'Este usuário é: Mágico.',
          fk_user: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 7',
          about: 'Este usuário é: Palhaço.',
          fk_user: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 8',
          about: 'Este usuário é: Malabarista.',
          fk_user: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 9',
          about: 'Este usuário é: Palhaço.',
          fk_user: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário animador 10',
          about: 'Este usuário é: Palhaço.',
          fk_user: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário cliente 1',
          about: '',
          fk_user: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Usuário cliente 2',
          about: '',
          fk_user: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async () => { },
};
