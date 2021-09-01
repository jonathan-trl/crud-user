const UserModel = require("../models/User");
class User {
  static async get() {
    try {
      const data = await UserModel.find();
      return data;
    } catch (e) {
      return { status: 400, e };
    }
  }

  static async findById(id) {
    try {
      const data = await UserModel.findById(id);
      if (!data) {
        return [];
      }
      return data;
    } catch (e) {
      return { status: 400, e };
    }
  }

  static async findByUsername(username) {
    try {
      const data = await UserModel.find({ username: username });
      if (!data) {
        return [];
      }
      return data;
    } catch (e) {
      return { status: 400, e };
    }
  }

  static async store(user) {
    try {
      const verifyUsername = await this.findByUsername(user.username);

      if (verifyUsername.length > 0) {
        return { message: "Nome de usuário já existe!" };
      }

      const data = await UserModel.create(user);

      return { message: "Usuário criado!", data };
    } catch (e) {
      return { status: 400, e };
    }
  }

  static async update(id, user) {
    try {
      const data = await UserModel.findByIdAndUpdate(id, user);

      if (!data) {
        return [];
      }

      const newUser = await UserModel.findById(data.id);

      return { message: "Usuário editado!", newUser };
    } catch (e) {
      return { status: 400, e };
    }
  }

  static async delete(id) {
    try {
      const data = await UserModel.findByIdAndDelete(id);

      if (!data) {
        return [];
      }

      return { message: "Usuário deletado!", data };
    } catch (e) {
      return { status: 400, e };
    }
  }
}

module.exports = User;
