'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('score', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idHospital: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hospitais',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      atendimento: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      limpeza: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tempoEspera: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      qualidadeInstalacoes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      textoLivre: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('score');
  }
};
