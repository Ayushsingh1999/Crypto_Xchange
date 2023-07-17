import React, { useEffect } from 'react'
import axios from "axios";
import { server } from '..';
import { useState } from 'react';
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import CoinCard from './CoinCard';

const Coins = () => {

const [coins,setcoins]=useState([])
const [loading,setloading]= useState(true);
const [error,seterror] = useState(false);
const [page,setpage] = useState(1);
const [currency,setcurrency] =useState("inr");


const currencysymbol = currency==="inr"?"₹":currency?"€":"$";

const changePage =(page)=>
{
  setpage(page);
  setloading(true);
}

const btns = new Array(132).fill(1);


useEffect(()=>
{
const fetchCoins = async()=>
{
   try {
    const {data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
    setcoins(data);
    console.log(data);
    setloading(false);

   } catch (error) {
    seterror(true);
    setloading(false);
   }
}
fetchCoins();// jaise hi component mount hoga waise hi function dispatch ho jayega
},[currency,page])

if(error) return <ErrorComp message={"Error while fetching Coins"}/>


  return (<Container maxW={'container.xl'}>
   {
    loading? <Loader/> : (
        <>



<RadioGroup value={currency} onChange={setcurrency} p={'8'}>
  <HStack spacing={'4'}>
    <Radio value ={"inr"}>INR</Radio>
    <Radio value ={"usd"}>USD</Radio>
    <Radio value ={"eur"}>EUR</Radio>
  </HStack>
</RadioGroup>

        
       <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {
          coins.map((i)=>
          (
           <CoinCard key={i.id} id ={i.id} name ={i.name} price ={i.current_price} img ={i.image} symbol={i.symbol} url ={i.url} currencysymbol={currencysymbol} />
          ))
        }
       </HStack>
      <HStack w={'full'} overflowX={"auto"} p={"8"}>
       {
        btns.map((item,index)=>
        (
          <Button key={index} bgColor ={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)}>{index+1}</Button>
        ))
       }
      </HStack>
        </>
    )
   }
  </Container>
  );
};



export default Coins;