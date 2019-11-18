class StreamResolver {
  constructor(readStream, encoding = "utf8") {
    this.piledString = "";
    this.readStream = readStream || null;
    this.encoding = encoding;
  }

  flush() {
    if (!this.readStream) {
      return null;
    }
    const self = this;
    return new Promise((resolve, reject) => {
      self.readStream.on("data", (chunk) => {
        self.piledString += chunk.toString(self.encoding);
      });

      self.readStream.on("end", () => {
        resolve(self.piledString);
      });

      self.readStream.on("error", (err) => {
        reject(err);
      });
    });
  }
}

module.exports = {
  StreamResolver,
};
