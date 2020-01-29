import sequelize from '.';

describe('Sequelize Setup', () => {
  test('The sequelize object is defined', () => {
    expect(sequelize).toBeDefined();
  });

  test('Sequelize uses sqlite for the test database', () => {
    expect(sequelize.getDialect()).toBe('sqlite');
  });
});
