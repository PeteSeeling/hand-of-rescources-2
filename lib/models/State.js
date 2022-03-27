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
  }

  static async findStateById(id) {
    const { rows } = await pool.query(
      `
        SELECT
        *
        FROM
        states
        WHERE
        id=$1
        `,
      [id]
    );
    return new State(rows[0]);
  }

  static async updateStateById(id, attributes) {
    const existingState = await State.findStateById(id);
    const updatedAttributes = { ...existingState, ...attributes };
    const { named, weather, statenumber } = updatedAttributes;
    const { rows } = await pool.query(
      `
          UPDATE
          states
          SET
          named=$1,
          weather=$2,
          statenumber=$3
          WHERE
          id=$4
          RETURNING
          *
          `,
      [named, weather, statenumber]
    );
    return new State(rows[0]);
  }

  static async deleteStateById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
          states
          WHERE
          id=$12
          RETURNING 
          *`,
      [id]
    );
    return new State(rows[0]);
  }
};
