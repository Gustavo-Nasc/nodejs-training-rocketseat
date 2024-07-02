export class UserAlradyExistsError extends Error {
  constructor() {
    super('User already exists')
  }
}
