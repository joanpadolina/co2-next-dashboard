const user = require('./user.json')
const allUser = require('./allUser.json')
const gimmick = require('./gimmick.json')
const community = require('./communitySavings.json')

module.exports = () => ({
  user,
  allUser,
  gimmick,
  community,
});