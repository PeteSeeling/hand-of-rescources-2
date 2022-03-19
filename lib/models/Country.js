const pool = require('../utils/pool');

module.exports = class Country {
  id;
  named;
  borders;
  founded;

  constructor(row) {
    this.id = row.id;
    this.named = row.named;
    this.borders = row.borders;
    this.founded = row.founded;
  }

  static async insert({ named, borders, founded }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                countries (named, borders, founded)
                VALUES
                ($1, $2, $3)
                RETURNING
                    *
                `,
      [named, borders, founded]
    );
    return new Country(rows[0]);
  }
  static async listAllCountries(){
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          countries`
    );
    return rows.map((row) => new Country(row));
  }

  static async findCountryById(id){
    const{ rows } = await pool.query(
      `SELECT
          *
          FROM
          countries
          WHERE
          id=$1
          `,
      [id]
    );
    return new Country(rows[0]);
  }
};
