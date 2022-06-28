// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


// Requires 6 functions at least
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PetoCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("Peto Coin", "PETO") {
        _mint(msg.sender, initialSupply);
    }
}
