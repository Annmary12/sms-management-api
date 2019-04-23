/**
 * @description Base repository
 * @class BaseRepository
 */
class BaseRepository {
  /**
   * @description creates a new document
   * @param {object} Model
   * @param {object} options
   * @returns {Document} returns a newly created document
   */
  static async create(Model, options) {
    try {
      return Model.create(options);
    } catch(error) {
      throw error;
    }
  }

  /**
   * @description find a document by field
   * @param {object} Model
   * @param {object} field
   * @param {object} value
   * @returns {Document} returns an array of object
   */
  static async findByField(Model, field, value) {
    try {
      return Model.find({[field] : value})
    } catch (error) {
      throw error
    }
  }

  /**
   * @description finds all documents
   * @param {object} Model
   */
  static async findAll(Model, options) {
    try {
      return Model.paginate({}, options);
    } catch (error) {
      throw error;
    }
  }
}

export default BaseRepository;