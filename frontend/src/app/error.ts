export class ConnectError extends Error {
  static {
    this.prototype.name = 'ConnectError'
  }
  constructor(message: string, error: Error) {
    super(message)
    this.message = message
    if (error) {
      this.stack += `\nCaused by: ${error.message}`
      if (error.stack) {
        this.stack += `\n${error.stack}`
      }
    }
  }
}

export class InvalidError extends Error {
  static {
    this.prototype.name = 'InvalidError'
  }
  constructor(message: string, error: Error) {
    super(message)
    this.message = message
    if (error) {
      this.stack += `\nCaused by: ${error.message}`
      if (error.stack) {
        this.stack += `\n${error.stack}`
      }
    }
  }
}