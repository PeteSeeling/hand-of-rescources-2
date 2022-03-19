const pool = require('../utils/pool');

module.exports = class Pizza {
  id;
  named;
  crust;
  toppings;

  constructor(row) {
    this.id = row.id;
    this.named = row.named;
    this.crust = row.crust;
    this.toppings = row.toppings;
  }

  static async insert({ named, crust, toppings }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                pizzas (named, crust, toppings)
                VALUES
                ($1, $2, $3)
                RETURNING
                    *
                `,
      [named, crust, toppings]
    );
    return new Pizza(rows[0]);
  }
  static async listAllPizzas(){
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          pizzas`
    );
    return rows.map((row) => new Pizza(row));
  }

  static async findPizzaById(id){
    const{ rows } = await pool.query(
      `SELECT
          *
          FROM
          pizzas
          WHERE
          id=$1
          `,
      [id]
    );
    return new Pizza(rows[0]);
  }

  static async updateCountryById(id, attributes) {
    const existingPizza = await Pizza.findCountryById(id);
    const updatedAttributes = { ...existingPizza, ...attributes };
    const { named, crust, toppings } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
        pizzas
        SET
        named=$1,
        crust=$2,
        toppings$3
        WHERE
         id=$4
         RETURNING
          *
         `,
      [named, crust, toppings, id]
    );
    return new Pizza(rows[0]);
  }
  static async deletePizzaById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
          pizzas
          WHERE
          id=$1
          RETURNING
          *
          `,
      [id]
    );
    return new Pizza(rows[0]);
  }
};

