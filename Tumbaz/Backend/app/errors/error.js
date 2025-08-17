class BadRequest extends Error {
     constructor(message) {
          super(message)
          this.code = '400';
          this.status = 400;
          this.message = message;
     }
}

class NotFound extends Error {
     constructor(message) {
          super(message)
          this.code = '404';
          this.status = 404;
          this.message = message;
     }
}

module.exports = {BadRequest, NotFound}