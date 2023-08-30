class DbError extends Error {
    static {
        this.prototype.name = 'DbError'
    }
    constructor(message, options) {
        super(message, options)
        Error.captureStackTrace(this, DbError)
      }
}

class ImageNotFoundError extends Error {
    static {
        this.prototype.name = 'ImageNotFoundError'
    }
    constructor(message, options) {
        super(message, options)
        Error.captureStackTrace(this, ImageNotFoundError)
      }
}

class IllegalImageError extends Error {
    static {
        this.prototype.name = 'IllegalImageError'
    }
    constructor(message, options) {
        super(message, options)
        Error.captureStackTrace(this, IllegalImageError)
      }
}

class RegisterError extends Error {
    static {
        this.prototype.name = 'RegisterError'
    }
    constructor(message, options) {
        super(message, options)
        Error.captureStackTrace(this, RegisterError)
      }
}

class DeleteError extends Error {
    static {
        this.prototype.name = 'DeleteError'
    }
    constructor(message, options) {
        super(message, options)
        Error.captureStackTrace(this, DeleteError)
      }
}

module.exports = { 
    DbError,
    ImageNotFoundError,
    IllegalImageError,
    RegisterError,
    DeleteError,
}