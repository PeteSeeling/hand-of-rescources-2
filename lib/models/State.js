const pool = require('../utils/pool');

module.exports = class State {
  id;
  named;
  weather;
  statenumber;

  constructor(row) {
    this.id = row.id;
    this.named = row.named;
    this.weather = row.weather;
    this.statenumber = row.statenumber;
  }

  static async insert({ named, weather, statenumber }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
            states (named, weather, statenumber)
            VALUES
            ($1, $2, $3)
            RETURNING 
            *
            `,
      [named, weather, statenumber]
    );
    return new State(rows[0]);
  }

  static async listAllStates(){
    const { rows } = await pool.query(
      `
        SELECT
        *
        FROM 
        states
        `
    );
    return rows.map((row) => new State(row));
  }};
