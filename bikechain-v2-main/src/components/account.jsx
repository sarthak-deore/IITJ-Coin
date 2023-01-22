import {
  Stack,
  Box,
  Flex,
  Center,
  Heading,
  CardBody,
  CardHeader,
  Text,
  Card,
  StackDivider,
} from "@chakra-ui/react";
import Config from "../config.json";

import { useContext } from "react";
import tshirt from "../assets/tshirt.png";
import bag from "../assets/bag.png";
import wt from "../assets/wt.png";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Bike from "./bike";
import { BlockChainContext } from "../context/blockChainContext";
import { useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { queryAllByAltText } from "@testing-library/react";

const Account = () => {
  const { renter, renterExists, currentAccount, getRenter } =
    useContext(BlockChainContext);
  if (renterExists) {
    return (
      <div>
        <div class="main">
          <h2>IDENTITY</h2>
          <div class="card">
            <div class="card-body">
              <i class="fa fa-pen fa-xs edit"></i>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{renter.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>:</td>
                    <td>{renter.lastName}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>{currentAccount}</td>
                  </tr>
                  <tr>
                    <td>Graduation Year</td>
                    <td>:</td>
                    <td>{parseInt(renter.gradYear["_hex"], 16)} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    getRenter();
  }
};

export default Account;
