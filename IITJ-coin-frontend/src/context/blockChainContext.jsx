import React, { useState } from "react";
import Config from "../config.json";
import { ethers } from "ethers";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BlockChainContext = React.createContext("");

export const BlockChainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [balance, setBalance] = useState();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [renterExists, setRenterExists] = useState();
  const [renter, setRenter] = useState();

  const [renterBalance, setRenterBalance] = useState();
  // const [due, setDue] = useState();
  // const [duration, setDuration] = useState();
  const [isOwner, setIsOwner] = useState();
  const [ownerBalance, setOwnerBalance] = useState();

  const signer = provider.getSigner();

  const address = Config.contractAddress;
  const abi = Config.contractAbi;
  const contract = new ethers.Contract(address, abi, signer);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Metamask not installed");
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const checkWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert("Metamask not installed");
      const accounts = await provider.send("eth_accounts", []);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const balance = await contract.balanceOf();
      const newBal = ethers.utils.formatEther(balance);
      setBalance(newBal);
    } catch (error) {
      console.log(error);
    }
  };

  const getOwnerBalance = async () => {
    try {
      const balance = await contract.getOwnerBalance();
      const newBal = ethers.utils.formatEther(balance);
      setOwnerBalance(newBal);
    } catch (error) {
      console.log(error);
    }
  };

  const checkRenterExists = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.renterExists(currentAccount);

        setRenterExists(renter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRenter = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.getRenter(currentAccount);
        setRenter(renter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRenter = async (
    walletAddress,
    firstName,
    lastName,
    roll,
    gradYear,
    balance
  ) => {
    try {
      const addNewRenter = await contract.addRenter(
        walletAddress,
        firstName,
        lastName,
        roll,
        gradYear,
        balance
      );
      await addNewRenter.wait();
      await checkRenterExists();
    } catch (error) {
      console.log(error);
      toast.error("Please connect your wallet!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getRenterBalance = async () => {
    try {
      if (currentAccount) {
        const balance = await contract.balanceOf(currentAccount);
        setRenterBalance(ethers.utils.formatEther(balance) * 10 ** 14);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const deposit = async (value) => {
  //   try {
  //     const bnbValue = ethers.utils.parseEther(value);
  //     const deposit = await contract.deposit(currentAccount, {
  //       value: bnbValue,
  //     });
  //     await deposit.wait();
  //     await getRenterBalance();
  //   } catch (error) {
  //     toast.error(error.reason, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  // const getDue = async () => {
  //   try {
  //     if (currentAccount) {
  //       const due = await contract.getDue(currentAccount);
  //       setDue(ethers.utils.formatEther(due));
  //       await getRenter();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getTotalDuration = async () => {
  //   try {
  //     if (currentAccount) {
  //       const totalDuration = await contract.getTotalDuration(currentAccount);
  //       setDuration(Number(totalDuration));
  //       await getRenter();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const makePayment = async (data) => {
    try {
      console.log(data);
      let address = data.address;
      let value = data.amount;
      value = value * 10000;
      // const bnbValue = ethers.utils.parseEther(value);
      console.log(value);

      const renter2 = await contract.renterExists(address);
      if (!renter2) {
        toast.error("Invalid Address", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      const toRenter = await contract.getRenter(address);
      console.log(toRenter.gradYear["_hex"]);
      const today = new Date();
      const year = today.getFullYear();

      console.log(year);
      console.log(parseInt(toRenter.gradYear["_hex"], 16));

      if (parseInt(toRenter.gradYear["_hex"], 16) < year) {
        toast.error("Your Rewards have expired", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      console.log(parseInt(renter.gradYear["_hex"], 16));
      console.log(parseInt(toRenter.gradYear["_hex"], 16));
      if (
        parseInt(toRenter.gradYear["_hex"], 16) !=
        parseInt(renter.gradYear["_hex"], 16)
      ) {
        console.log("different");
        const st = await contract.transferDifferent(address, value);
        if (!st) {
          toast.error("Payment Failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.success("Payment Successful", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        console.log("same");
        const st = await contract.transferSame(address, value);
        if (!st) {
          toast.error("Payment Failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.success("Payment Successful", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }

      await getRenter();
      await checkRenterExists();
      await getRenterBalance();
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkOut = async (price) => {
    try {
      const st = await contract.transfer(
        "0x9b0d2ddF47d82AcEbb4a29C89Fc68a1Fd37293c2",
        price * 10000
      );
      if (!st) {
        toast.error("Payment Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("Payment Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // const checkIn = async () => {
  //   try {
  //     if (currentAccount) {
  //       const checkIn = await contract.checkIn(currentAccount);
  //       await checkIn.wait();
  //       await getRenter();
  //       await getDue();
  //       await getTotalDuration();
  //     }
  //   } catch (error) {
  //     toast.error(error.reason, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  const checkOwner = async () => {
    try {
      if (currentAccount) {
        const isOwner = await contract.checkOwner(currentAccount);
        setIsOwner(isOwner);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const withdrawToOwner = async () => {
  //   try {
  //     if (isOwner) {
  //       const withdraw = await contract.withdrawOwnerBalance();
  //       await withdraw.wait();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const sd = async () => {
  //   try {
  //     if (currentAccount) {
  //       const isOwner = await contract.checkOwner(currentAccount);
  //       setIsOwner(isOwner);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    checkWalletConnected();
    checkRenterExists();
    getRenter();
    getRenterBalance();
    checkOwner();
    // getDue();
    // getTotalDuration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount]);

  return (
    <BlockChainContext.Provider
      value={{
        connectWallet,
        renter,
        getRenter,
        currentAccount,
        renterExists,
        addRenter,
        checkRenterExists,
        renterBalance,
        // due,
        // duration,
        makePayment,
        // checkIn,
        checkOut,
        isOwner,
        checkOwner,
        getBalance,
        balance,
        getOwnerBalance,
        ownerBalance,
        // withdrawToOwner,
      }}
    >
      {children}
    </BlockChainContext.Provider>
  );
};
