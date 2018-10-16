const Devices = require("./devices");
const Session = require("./session");
const OAuth = require("./oauth");

module.exports = class {
  constructor(sequelize) {
    this.session = new Session(sequelize);
    this.oauth = new OAuth(sequelize);
    this.devices = new Devices(sequelize);

    sequelize.sync().catch(error => {
      console.error(error.message);
      process.exit(1);
    });
  }
};
