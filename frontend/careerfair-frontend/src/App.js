import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
// Build a simple React project named “careerfair-frontend” that communicates
// with your deployed “CareerFair” contract. The specifications are as follows:
// • A button that shows “Connect Wallet”. This button should:
// – console.log if “No ETH wallet detected” if no ETH object is detected
// and should console.log “ETH detected” if ETH object is detected
// • A button that shows “Add Company” and a textfield that:
// – Allows the owner of the contract to enter in a company name to be
// added. If unsuccessful, display an alert saying “Only the owner can
// add a company”
// • A button that shows “Enroll” that allows the student to enroll
// – Display an alert if the student is already enrolled saying “You are
// already enrolled in the career fair”
// • A button that ahows “Unenroll” that allows the student to unenroll
// – Display an alert if the student is not already enrolled saying “You
// are not enrolled in the career fair”
// • A button that shows “See Attendees” that displays a list of all registered
// addresses
// – Display “no one is enrolled” if no students are registered for the career
// fair




function App() {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have an ETH wallet!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
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
      <header className="App-header">
        {!currentAccount && (
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </header>
    </div>
  );
}

export default App;