const TestCollege = artifacts.require("TestCollege");

contract("Testing exam 2", accounts => {

    let instance;

    beforeEach("Deploy new contract", async () => {
        instance = await TestCollege.new();
    })

    it("Only professor can add a new revision", async () =>
    {
        try{
            await instance.createRevision([1, "Mauricio", 0, false, 0],{from: accounts[0]});
            const note = await instance.listNotes.call(1);
            console.log(note.id);
            assert.equal(1, note.id);
        }catch (e) {
            console.log("Error", e);
            assert.equal("You are not the owner.", e.reason);
        }
    })

    it("Only professor can finalize a revision", async () =>
    {
        try{
            await instance.finalizeReview(1,80,{from: accounts[0], value: web3.utils.toWei("1", "ether")});
            const note = await instance.listNotes.call(1);

            assert.equal(note.finalized, true);
            assert.equal(note.typeTest, 1);
            assert.equal(note.score, 80);
        }catch (e) {
            console.log("Error", e);
            assert.equal("You are not the owner.", e.reason);
        }
    })

    it("Only professor can finalize revision in general", async () =>
    {
        try{
            await instance.closeOrOpenRevisions(true, {from: accounts[0]});
            const flag = await instance.getRevisionsClosed.call();
            assert.equal(flag, true);
        }catch (e) {
            console.log("Error", e);
            assert.equal("You are not the owner.", e.reason);
        }
    })

    it("Verify that student gets 100 because of rounding up", async () =>
    {
        await instance.createRevision([2, "Roberto", 0, false, 0],{from: accounts[0]});
        await instance.finalizeReview(2,91,{from: accounts[0], value: web3.utils.toWei("1", "ether")});
        const note = await instance.listNotes.call(2);
        console.log(note.score);
        assert.equal(100, note.score);
    })


    it("Verify that student name length is higher than 5", async () =>
    {
        try {
            await instance.createRevision([3, "Pepe", 0, false, 0],{from: accounts[0]});

            const note = await instance.listNotes.call(3);
            console.log(note.name);
            assert(note.name.length > 5);
        } catch (e) {
            console.log("Error", e);
            assert.equal("The name of product should be more than.", e.reason);
        }

    })

    it("Verify that student gets 100", async () =>
    {
        await instance.createRevision([4, "Patricio", 0, false, 0],{from: accounts[0]});
        await instance.finalizeReview(4,100,{from: accounts[0], value: web3.utils.toWei("1", "ether")});
        const note = await instance.listNotes.call(4);
        console.log(note.score);
        assert.equal(100, note.score);
    })

    it("Verify that student has its score finalized and that she pays 10 ETH", async () =>
    {

            await instance.createRevision([5, "Tatiana", 0, false, 0],{from: accounts[0]});
            await instance.finalizeReview(5,30,{from: accounts[0], value: web3.utils.toWei("1", "ether")});
            const note = await instance.listNotes.call(5);
            console.log("Que no pro");
            console.log(note.finalized);
            console.log(note.typeTest.words[0]);
            console.log("Holas")
            assert.equal(note.finalized, true);
            assert.equal(note.typeTest.words[0], 1);

            const price = "11";
            const iBalance = accounts[5].balance;
            try {
                await instance.request2T(5,{from: accounts[0], value: web3.utils.toWei(price, "ether")});
                const fBalance = accounts[5].balance;
                console.log(note.typeTest);
                assert.equal(note.finalized, false);
                assert.equal(note.typeTest.words[0], 2);
                const diff = iBalance - fBalance

                assert(10 <= diff);

                console.log(diff);
            }catch (e) {
                console.log("Error", e);
                assert.equal("Your test 1P was not reviewed.", e.reason);
            }



    })

    it("Only professor can check the balance", async () =>
    {
        try {
            await instance.balanceOfCollege({from: accounts[0]});

        } catch (e) {
            console.log("Error", e);
            assert.equal("You are not the owner.", e.reason);
        }

    })


})
