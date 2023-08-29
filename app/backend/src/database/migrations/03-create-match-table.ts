import { DataTypes, Model, QueryInterface } from "sequelize";
import { IMatch } from "../../Interfaces/matches/IMatch";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      homeTeamId: {
        allowNull: false,
        field: 'home_team_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: DataTypes.INTEGER,
      },
      awayTeamId: {
        allowNull: false,
        field: 'away_team_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: DataTypes.INTEGER,
      },
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: DataTypes.INTEGER,
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};
