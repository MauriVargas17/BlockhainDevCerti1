const Inbox = artifacts.require('Inbox')

contract('Inbox', accounts => {
    it('getMessage', async () => {
        const instance = await Inbox.deployed();
        const message = await instance.getMessage.call();
        assert.equal(message, "Hi PPL") 

    })

    it('setMessage', async () => {
        const instance = await Inbox.deployed();
        await instance.setMessage("Hi Mauri", {from: accounts[6]});
        const message = await instance.getMessage.call();
        assert.equal(message, "Hi Mauri");
    })
})