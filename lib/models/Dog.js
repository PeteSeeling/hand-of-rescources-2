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
  static async listAllDogs() {
    const { rows } = await pool.query(
      `
          SELECT 
           *
          FROM
           dogs`
    );
    return rows.map((row) => new Dog(row));
  }

  static async findDogById(id){
    const { rows } = await pool.query(
      `SELECT
           *
          FROM
           dogs
           WHERE
            id=$1
            `,
      [id]
    );
    return new Dog(rows[0]);
  }

  static async updateDogById(id, attributes) {
    const existingDog = await Dog.findDogById(id);
    const updatedAttributes = { ...existingDog, ...attributes };
    const { breed, named, age } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
         dogs
         SET
          breed=$1,
          named=$2,
          age=$3
        WHERE
         id=$4
         RETURNING
            *
         `,
      [breed, named, age, id]
    );
    return new Dog(rows[0]);
  }
  static async deleteDogById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
           dogs
           WHERE
           id=$1
           RETURNING
           *
           `,
      [id]
    );
    return new Dog(rows[0]);
  }
};
