pragma solidity ^0.8.0;

contract ExampleContract {
    uint public count = 0;
    
    event Increment(uint value);
    
    function increment() public {
        count += 1;
        emit Increment(count);
    }

    function getCount() public view returns (uint) {
        return count;
    }
}