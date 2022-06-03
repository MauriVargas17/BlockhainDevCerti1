const Inbox = artifacts.require('Inbox')

contract('Inbox', accounts => {
    it('getMessage', async () => {
        const instance = await Inbox.deployed();
        const message = await instance.getMessage.call();
        assert.equal(message, "Hi PPL") 

    })

    it('setMessage only owner can change', async () => {
        const instance = await Inbox.deployed();
        await instance.setMessage("Hi Mauri", {from: accounts[0]});
        const message = await instance.getMessage.call();
        assert.equal(message, "Hi Mauri");
    })

    it('setMessage message not changed by others', async () => {
        try{
            const instance = await Inbox.deployed();
            await instance.setMessage("hey", {from: accounts[1]});
        } catch (e) {
            console.log('Error!', e);
            assert.equal(e.reason, "Only the owner can change the message");
        }
    })

})