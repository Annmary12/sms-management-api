class BaseRepository {
  static async create(Model, options) {
    try {
      return await Model.create(options);
    } catch(error) {
      throw error;
    }
  }
}

export default BaseRepository;