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
        await instance.registerPlayer({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        await instance.registerPlayer({from: accounts[2], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    })

    it("Register player verifying minimum amount", async () => {

        try {
            await instance.registerPlayer({from: accounts[1], value: web3.utils.toWei("1", "ether")});
            assert(false);
        } catch(e) {
            console.log('ERROR', e);
            assert.equal("The minimum amount to participate is 2 ether", e.reason);
        }
    })

    it("Only manager can pick a winner", async () => {
        try {
            await instance.pickWinner({from: accounts[8]});
            assert(false);
        } catch (e) {
            assert.equal("Only owner can execute this function", e.reason);
        }
    })

    it("Send money to the winner only & reset players array", async () => {

        await instance.registerPlayer({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const initialBalanceFromPlayer = await web3.eth.getBalance(accounts[1]);
        const initialBalanceFromContract = await web3.eth.getBalance(instance.address);

        await instance.pickWinner({from: accounts[0]});

        const finalBalanceFromPlayer = await web3.eth.getBalance(accounts[1]);
        const finalBalanceFromContract = await web3.eth.getBalance(instance.address);
        const total = parseFloat(initialBalanceFromPlayer) + parseFloat(initialBalanceFromContract);
        console.log("initialBalanceFromContract: "+initialBalanceFromContract);
        console.log("initialBalanceFromPlayer: "+initialBalanceFromPlayer);
        console.log("finalBalanceFromPlayer: "+finalBalanceFromPlayer);
        console.log("total: "+total);
        assert(finalBalanceFromPlayer == total);

        const players = await instance.getPlayers.call();
        assert(players.length == 0);
    })
})
