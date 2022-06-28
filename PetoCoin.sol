// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


// Requires 6 functions at least
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


// By using this model, we can only transfer tokens, but cannot sell or destroy tokens
contract PetoCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("Peto Coin", "PETO") {
        _mint(msg.sender, initialSupply);
    }
}
