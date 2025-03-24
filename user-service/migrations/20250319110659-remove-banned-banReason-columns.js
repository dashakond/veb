module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'banned');
    await queryInterface.removeColumn('users', 'banReason');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'banned', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('users', 'banReason', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
