pragma solidity ^0.4.0;

contract Charity {
    
    uint256 private counter;
    mapping(uint256 => address) private counterToAddress;
    mapping(address => uint256) private addressToRole; // 1 charity, 2 volunteer, 3 receiver
    mapping(address => uint256) private addressBalance;
    
    function Charity() {
        counter = 0;
    }
    
    function getCounter() constant returns (uint256 _counter) {
        _counter = counter;
    }
    
    function addEntity(address _to, uint256 _role) {
        counterToAddress[counter] = _to;
        addressToRole[_to] = _role;
        addressBalance[_to] = 0;
        counter += 1;
    } 
    
    function getEntityAddress(uint256 _counter) constant returns(address _address) {
        _address = _address = counterToAddress[_counter];
    }
     
    function getEntityRole(uint256 _counter) constant returns( uint256 _role) {
        address _address = counterToAddress[_counter];
        _role = addressToRole[_address];
    }
    
    function getEntityBalance(uint256 _counter) constant returns(uint256 _balance) {
        address _address = counterToAddress[_counter];
        _balance = addressBalance[_address];
    }

}