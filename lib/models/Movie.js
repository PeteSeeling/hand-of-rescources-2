const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  star;
  years;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.star = row.star;
    this.years = row.years;
  }
  
  static async insert({ title, star, years }){
    const { rows } = await pool.query(
      `
        INSERT INTO
            movies (title, star, years)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [title, star, years]
    );
    return new Movie(rows[0]);
  }};

