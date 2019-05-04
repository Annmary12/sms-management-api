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
    return Model.create(options);
  }

  /**
   * @description find documents by a field
   *
   * @param {object} Model
   * @param {object} field
   * @param {object} value
   *
   * @returns {Document} returns an array of object
   */
  static async findByField(Model, field, value) {
    return Model.find({[field] : value});
  }

  /**
   * @description find a document by field
   *
   * @param {object} Model
   * @param {object} field
   * @param {object} value
   *
   * @returns {Document} returns an object
   */
  static async findOneByField(Model, field, value) {
    return Model.findOne({[field] : value})
  }

  /**
   * @description finds all documents
   *
   * @param {object} Model
   * @param {object} options
   * @param {object} query
   *
   * @returns {Document} returns an array of object
   */
  static async findAll(Model, query, options) {
    return Model.paginate(query, options);
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
    return Model.findById(id);
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
    return Model.findByIdAndRemove(id);
  }

  /**
   * @description deletes many documents
   *
   * @param {object} Model
   * @param {object} query
   *
   * @returns {Document} returns deleted documents
   */
  static async deleteMany(Model, query) {
    return Model.deleteMany(query);
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
    return Model.findOneAndUpdate({ _id: id }, options, { new: true });
  }
}

export default BaseRepository;