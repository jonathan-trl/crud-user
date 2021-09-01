import api from "../utils/axios";
import IUser from "../models/User";

class UserService {
  static async get() {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (e) {
      return e;
    }
  }

  static async findById(id: string) {
    try {
      const response = await api.get(`/user/${id}`);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  static async store(data: IUser) {
    try {
      const response = await api.post("/user", data);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  static async update(id: string, data: IUser) {
    try {
      const response = await api.put(`/user/${id}`, data);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`/user/${id}`);
      return response.data;
    } catch (e) {
      return e;
    }
  }
}
export default UserService;
