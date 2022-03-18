const pool = require('.../utils/pool');

module.exports = class Dog {
  id;
  breed;
  named;
  age;

  constructor(row) {
    this.id = row.id;
    this.breed = row.breed;
    this.named = row.named;
    this.age = row.age;
  }

  static async insert({ breed, named, age }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                dogs (breed, named, age)
            VALUES
                ($1, $2, $3)
            RETURNING
                *
            `,
      [breed, named, age]
    );
    return new Dog(rows[0]);
  }
  static async listAllDogs()
};
