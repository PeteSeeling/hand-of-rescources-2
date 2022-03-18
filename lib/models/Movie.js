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
  
  static async insert({ title, star, years }) {
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
  }
  static async listAllMovies() {
    const { rows } = await pool.query(
      `
        SELECT
         *
        FROM
         movies`
    );
    return rows.map((row) => new Movie(row));
  }
  static async findMovieById(id){
    const { rows } = await pool.query(
      `
            SELECT
              *
            FROM
              movies
            WHERE
              id=$1
            `,
      [id]
    );
    return new Movie(rows[0]);
  }

  static async updateMovieById(id, attributes) {
    const existingMovie = await Movie.findMovieById(id);
    const updatedAttributes = { ...existingMovie, ...attributes };
    const { title, star, years } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
         movies
        SET
         title=$1,
         star=$2,
         years=$3
        WHERE
         id=$4
        RETURNING
            *
        `,
      [title, star, years, id]
    );
    return new Movie(rows[0]);
  }
  static async deleteMovieById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            movies
          WHERE
            id=$1
          RETURNING
            *`,
      [id]
    );
    return new Movie(rows[0]);
  }
};


