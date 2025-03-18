const helloWorld = require("../helloWorld");
test('returns "Hello, World!"', () => {
  expect(helloWorld()).toBe("Hello, World!");
});

function helloWorld() {
  return "Hello, World!";
}

module.exports = helloWorld;
