const pool = require('../utils/pool');

module.exports = class State {
  id;
  named;
  weather;
  number;

  constructor(row) {
    this.id = row.id;
    this.named = row.named;
    this.weather = row.weather;
    this.founded = row.founded;
  }

    static async insert({ named, weather, number }) {
        const { rows } = await pool.query(
            `
            INSERT INTO
            states (named, weather, number)
            VALUES
            ($1, $2, $3)
            RETURNING 
            *
            `,
            [named, weather, number]
        );
        return new State(rows[0]);
    }
};
