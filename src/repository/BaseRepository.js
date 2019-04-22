/**
 * @description Base repository
 * @class BaseRepository
 */
class BaseRepository {
  /**
   * @description creates a new document
   * @param {Object} Model
   * @param {Object} options
   * @returns {Document} returns a newly created document
   */
  static async create(Model, options) {
    try {
      return await Model.create(options);
    } catch(error) {
      throw error;
    }
  }

  /**
   * @description find a contact by field
   * @param {Object} Model
   * @param {Object} option
   * @returns {Document} returns an array of object
   */
  static async findByField(Model, option) {
    try {
      return await Model.findByField({option})
    } catch (error) {
      throw error
    }
  }
}

export default BaseRepository;