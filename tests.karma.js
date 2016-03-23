// require all `tests/**/*.spec.js`
// const context = require.context('./src', true, /\.spec\.js$/)
const context = require.context('./src', true, /user-auth.spec\.js$/)
context.keys().forEach(context)
