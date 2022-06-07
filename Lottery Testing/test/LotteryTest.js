const Lottery = artifacts.require("Lottery");

contract("Testing dude", accounts => {
    it("Registering a player", async () =>
    {
        const instance = await Lottery.deployed();
        await instance.registerPlayer({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(1, players.length);
        assert.equal(accounts[1], players[0])

    })
})