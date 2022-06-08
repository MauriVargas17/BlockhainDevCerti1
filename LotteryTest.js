const Lottery = artifacts.require("Lottery");

contract("Testing dude", accounts => {

    let instance;

    beforeEach("Deploy new contract", async () => {
        instance = await Lottery.new();
    })

    it("Registering a player", async () =>
    {
        //const instance = await Lottery.deployed();
        await instance.registerPlayer({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(1, players.length);
        assert.equal(accounts[1], players[0])

    })

    it("Registering multiple players", async () => {
        //const instance = await Lottery.deployed();
        await instance.registerPlayer({from: accounts[0], value: web3.utils.toWei("3", "ether")});
        await instance.registerPlayer({from: accounts[1], value: web3.utils.toWei("4", "ether")});
        await instance.registerPlayer({from: accounts[2], value: web3.utils.toWei("5", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    })
})
