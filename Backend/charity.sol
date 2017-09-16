pragma solidity ^0.4.0;

contract Charity {

    /*
      1 doner
      2 charity
      3 contractor
      4 recipient
    */
    
    mapping(address => uint256) private addressRole;
    mapping(address => uint256) private addressBalance;
    
    function Charity() {
    }
    
    function addEntity(address _to, uint256 _role) {
        addressRole[_to] = _role;
        addressBalance[_to] = 0;
    }
    
    function donate(address _to, uint256 _amount) {
        require(_amount > 0);
        addressBalance[_to] += _amount;
    }
    
    function transfer(address _from, address _to, uint256 _amount) {
        require(_amount > 0);
        require(addressBalance[_from] - _amount >= 0);
        addressBalance[_from] -= _amount;
        addressBalance[_to] += _amount;
    }

    function getEntity(address _address) constant returns( uint256 _role) {
        _role = addressRole[_address];
    }

    function getBalance(address _address) constant returns(uint256 _balance) {
        _balance = addressBalance[_address];
    }

}