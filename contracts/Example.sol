// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Example {
    IERC20 public token;

    constructor(address token_) {
        token = IERC20(token_);
    }

    function transferAsset(address to_, uint256 amount_) external {
        bool sent = token.transfer(to_, amount_);
        require(sent, "Example: transfer failed");
    }
}
