class APIError extends Error {
  constructor({ code, message }) {
    const fullMsg = `${Error.name}: ${code} ${message}`;

    super(fullMsg);
    this.name = Error.name;
    this.code = code;
    this.message = message;
  }
}

export default (condition = true, inputCode = 500, inputMessage = 'Internal error.') => {
  if (condition) { throw (new APIError({ code: inputCode, message: inputMessage })); }
};
