pragma solidity ^0.8.0;

contract CounterContract {
    uint public currentCounterValue = 0;

    event CounterIncremented(uint newValue);

    function incrementCounter() public {
        currentCounterValue += 1;
        emit CounterIncremented(currentCounterValue);
    }

    function getCurrentCounterValue() public view returns (uint) {
        return currentCounterValue;
    }
}