// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ExampleContract
 * @dev This contract allows incrementing a count and retrieving the count value.
 * It demonstrates basic Solidity concepts including state variables, functions, and events.
 */
contract ExampleContract {
    // State variable to keep track of the count
    uint public count = 0;

    // Event that is emitted after each increment
    event Increment(uint value);

    /**
     * @dev Increments the count by one and emits the Increment event with the new count value.
     */
    function increment() public {
        count += 1;
        emit Increment(count);
    }

    /**
     * @dev Returns the current count value.
     * @return The current count as a uint.
     */
    function getCount() public view returns (uint) {
        return count;
    }
}