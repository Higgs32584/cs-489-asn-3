// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract CareerFair {

//     Create a simple college career fair smart contract named “CareerFair” for Loyola. This contract must be deployed to Goerli’s testnet.
// For this career fair system, you will have seven total companies on initialization:
// • Amazon
// • Google
// • Apple
// • Microsoft
// • Meta
// • Gemini
// • SecureEd
// The career fair system will store information for all the students who have
// enrolled in the career fair. After creating the contract, we should add the owner
// of the career fair system. Below are the minimum function requirements for the
// career fair contract:

    address public owner;
    mapping(address => bool) students;
    mapping(string => bool) companies;
    address[] bob;
    uint public numOfStudents;

    constructor() {
        owner = msg.sender;
        numOfStudents = 0;
        companies["Amazon"] = true;
        companies["Google"] = true;
        companies["Apple"] = true;
        companies["Microsoft"] = true;
        companies["Meta"] = true;
        companies["Gemini"] = true;
        companies["SecureEd"] = true;
    }
    //enroll (): Save when a student enrolls for the career fair. If a student is
    //currently enrolled, they cannot enroll again

    function enroll() public {
        require(!students[msg.sender], "You are already enrolled.");
        students[msg.sender] = true;
        bob.push(msg.sender);
        numOfStudents++;
    }

    //• add (companyName): Only the owner can add a new company to the
    //career fair contract. The owner cannot add a company that already exists
    //(same companyName)
    function add(string memory companyName) public {
        require(msg.sender == owner, "You are not the owner!");
        require(!companies[companyName], "Company already exists");
        companies[companyName] = true;
    }
    //getAttendees (): Returns all of the student addresses enrolled in the career
    //fair
    function getAttendees() public view returns (address[] memory) {
        return bob;
    }
    //• unenroll (): a student can unenroll from the career fair. A student cannot
    //unenroll unless they are already enrolled
    function unenroll() public {
        require(students[msg.sender], "You are not enrolled.");
        students[msg.sender] = false;
        numOfStudents--;
        removeFromArray(msg.sender);
    }
    function removeFromArray(address element) internal {
    for (uint i = 0; i < numOfStudents; i++) {
        if (bob[i] == element) {
            delete bob[i];
            // Shift the remaining elements to the left
            for (uint j = i; j < numOfStudents - 1; j++) {
                bob[j] = bob[j + 1];
            }
            // Resize the array to remove the last element
            bob.pop();
            break;
        }
    }
}
}