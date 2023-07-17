import React, { useEffect } from 'react'
import axios from "axios";
import { server } from '..';
import { useState } from 'react';
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import ErrorComp from './ErrorComp';

const Exchanges = () => {

const [exchanges,setexchanges]= useState([]);
const [loading,setloading]= useState(true);
const [error,seterror] = useState(false);



useEffect(()=>
{
const fetchExchanges = async()=>
{
   try {
    const {data}= await axios.get(`${server}/exchanges`);
    setexchanges(data);
    console.log(data);
    setloading(false);

   } catch (error) {
    seterror(true);
    setloading(false);
   }
}
fetchExchanges();// jaise hi component mount hoga waise hi function dispatch ho jayega
},[])

if(error) return <ErrorComp message={"Error while fetching Exchanges"}/>


  return (<Container maxW={'container.xl'}>
   {
    loading? <Loader/> : (
        <>
       <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
        {
          exchanges.map((i)=>
          (
           <ExchangeCard key={i.id} name ={i.name} img ={i.image} rank ={i.trust_score_rank} url ={i.url} />
          ))
        }
       </HStack>
        </>
    )
   }
  </Container>
  );
};



export default Exchanges;