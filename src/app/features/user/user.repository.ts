import pool from "../../../config/postgresql";

class UserRepository {
  async findByEmail(email: string) {
    return await (await pool.query(`select * from users where email = '${email}'`)).rows[0];
  }
}

export default new UserRepository();