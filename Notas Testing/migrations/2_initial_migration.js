const Notas = artifacts.require("Notes");

module.exports = function (deployer) {
    deployer.deploy(Notas);
};