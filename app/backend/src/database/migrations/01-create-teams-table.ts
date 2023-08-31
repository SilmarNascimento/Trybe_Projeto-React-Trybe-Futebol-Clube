import { DataTypes, Model, QueryInterface } from "sequelize";
import { ITeam } from '../../Interfaces/teams/ITeam';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      teamName: {
        allowNull: false,
        field: 'team_name',
        type: DataTypes.STRING,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
}