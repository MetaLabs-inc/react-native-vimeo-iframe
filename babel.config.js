var path = require('path')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  alias: {
    react: path.resolve('./node_modules/react'),
  },
}
