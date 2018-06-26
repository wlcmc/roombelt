const Sequelize = require("sequelize");

module.exports = class {
  constructor(sequelize) {
    this.Model = sequelize.define("login", {
      token: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      scope: { type: Sequelize.STRING, defaultValue: "none" },
      userId: Sequelize.STRING,
      deviceId: Sequelize.STRING,
      isVerified: Sequelize.BOOLEAN
    });
  }

  async createAccessToken({ scope, userId, deviceId, isVerified } = {}) {
    const model = this.Model.build({ scope, userId, deviceId, isVerified });
    await model.save();

    return model.token;
  }

  async getAccessTokenDetails(token) {
    const defaultResult = { scope: "none", isVerified: false };
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(token)) {
      return defaultResult;
    }

    return (await this.Model.findOne({ where: { token } })) || defaultResult;
  }

  async verifyDeviceAccessToken(deviceId, userId) {
    await this.Model.update({ isVerified: true, userId }, { where: { deviceId } });
  }
};
