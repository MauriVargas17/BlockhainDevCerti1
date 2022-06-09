const Notas = artifacts.require("Notes");

contract("Testing Notas", accounts => {

    let instance;

    beforeEach("Deploy new contract", async () => {
        instance = await Notas.new();
    })

    it("Evaluando un alumno", async () =>
    {
            await instance.Evaluar("Bob", 87, {from:accounts[0]});
            const nota = await instance.VerNotas.call("Bob");
            assert.equal(nota, 87);

    })

    it("Solo profesor puede evaluar", async () =>
    {
        try{
            await instance.Evaluar("Bob", 87, {from:accounts[1]});
            const nota = await instance.VerNotas.call("Bob");
            assert.equal(nota, 87);
        } catch (e) {
            console.log('Error!', e);
            assert.equal(e.reason, "No tienes permisos para ejecutar esta funcion.");
        }

    })

})