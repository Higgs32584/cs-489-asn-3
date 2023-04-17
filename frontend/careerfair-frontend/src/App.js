import './App.css';
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import abi from './utils/CareerFair.json';

// • A button that shows “See Attendees” that displays a list of all registered
// addresses
// – Display “no one is enrolled” if no students are registered for the career
// fair

  


function App() {

  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0x82DdDA9582F6Ee6C96bDE65115Fafa037f7527Bc";

  const contractABI= abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        // console.log if “No ETH wallet detected” if no ETH object is detected
        console.log("No ETH wallet detected");
        return;
      } else {
        // and should console.log “ETH detected” if ETH object is detected
        console.log("ETH Detected", ethereum);
      }

      // Pulls array of accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        // – If clicked, allow a user to connect their wallet to the app. If successful, remove the button from the UI. If unsuccessful, display an alert
// saying “Wallet could not be connected”
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const enroll = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //Get value from input
        //allows the student to enroll */
        //Provider and Signer
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress,contractABI, signer);
        const attendees = await contract.getAttendees();
        if(attendees.includes(currentAccount)){
          console.log("You are already enrolled in the career fair");
        }
        else{
          const tx = await contract.enroll();
          console.log("Transaction sent:", tx.hash);
          await tx.wait();
          console.log("Enrolled successfully!");
        }
    }
  }
    catch(error){
      console.log(error)
    }
  }
  const unenroll = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //Get value from input
        //allows the student to enroll */
        //Provider and Signer
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress,contractABI, signer);
        const attendees = await contract.getAttendees();
        if(attendees.includes(currentAccount)){
          const tx = await contract.unenroll();
          console.log("Transaction sent:", tx.hash);
          await tx.wait();
          console.log("Enrolled successfully!");
        }
        else{
          console.log("You are not enrolled in the career fair");
        }
    }
  }
    catch(error){
      console.log(error)
    }
  }

  const addCompany = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //Get value from input
        const companyName = document.getElementById("companyName").value;
        //Provider and Signer
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Get contract
        //Allows the owner of the contract to enter in a company name to be added.
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const owner = await contract.owner();
        if(owner === currentAccount){
        const tx = await contract.add(companyName);
        console.log("Transaction sent:", tx.hash);
        await tx.wait();
        console.log("Company added successfully!");
        }
        else{
          // If unsuccessful, display an alert saying “Only the owner can add a company”
          console.log("Only the owner can add a company");
        }
    }
  }
    catch(error){
      console.log(error)
    }
  }
  // Allows to connect an auth'd wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Need an ETH wallet to connect to!");
        return;
      }

      // Makes request to connect to ETH account (Metamask wallet)
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);

      // Set the currAccount state within this component to know the address of the account
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">

      {/* Connect Wallet */}
      <header className="App-header">
        {!currentAccount && (
          // A button that shows “Connect Wallet”. This button should:
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

    {/* A button that shows “Add Company” and a textfield that: */}
          <input type="text" id="companyName" name="companyName" />
        <button onClick={addCompany}>
            Add Company
          </button>
           {/* • A button that shows “Enroll” that */}
        <button onClick={enroll}>
            Enroll
          </button>
          {/* • A button that shows “Enroll” that */}
        <button onClick={unenroll}>
            Unenroll
          </button>
                    {/* • A button that shows “Enroll” that */}
        <button onClick={unenroll}>
        See Attendees
          </button>


      </header>
    </div>
  );
}

export default App;