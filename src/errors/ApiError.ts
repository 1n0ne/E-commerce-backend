class ApiError {
  constructor (public code: number, public message: string) {
    this.code = code
    this.message = message
  }

  static badRequest (msg: string) {
    return new ApiError(400, msg)
  }

  static internal (msg: string) {
    return new ApiError(500, msg)
  }

  static existError (msg: string) {
    return new ApiError(409, msg)
  }
}

export default ApiError
