/**
 * @description Base repository
 * @class BaseRepository
 */
class BaseRepository {
  /**
   * @description creates a new document
   *
   * @param {object} Model
   * @param {object} options
   *
   * @returns {Document} returns a newly created document
   */
  static async create(Model, options) {
    try {
      return Model.create(options);
    } catch(error) {
      throw error;
    }
  }

  static async findByField(Model, field, value) {
    try {
      return Model.find({[field] : value})
    } catch (error) {
      throw error
    }
  }
  /**
   * @description find a document by field
   *
   * @param {object} Model
   * @param {object} field
   * @param {object} value
   *
   * @returns {Document} returns an array of object
   */
  static async findOneByField(Model, field, value) {
    try {
      return Model.findOne({[field] : value})
    } catch (error) {
      throw error
    }
  }

  /**
   * @description finds all documents
   *
   * @param {object} Model
   * @param {object} options
   *
   * @returns {Document} returns an array of object
   */
  static async findAll(Model, options) {
    try {
      return Model.paginate({}, options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description finds a document by id
   *
   * @param {object} Model
   * @param {string} id
   *
   * @returns {Document} returns one document
   */
  static async findById(Model, id) {
    try {
      return Model.findById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description deletes a document by ID
   *
   * @param {object} Model
   * @param {string} id
   *
   * @returns {Document} returns deleted document
   */
  static async delete(Model, id) {
    try {
      return Model.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description updates a document
   *
   * @param {object} Model
   * @param {strring} id
   * @param {object} options
   *
   * @returns {Document} returns the updated document
   */
  static async update(Model, id, options) {
    try {
      return Model.findOneAndUpdate({ _id: id }, options, { new: true });
    } catch (error) {
      throw error;
    }
  }
}

export default BaseRepository;