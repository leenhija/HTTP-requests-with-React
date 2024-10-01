import { useEffect, useState } from "react";
export function useFetch(fetchFun , initialVal){
    const [error,setError]=useState();
    const [fetchedData,setFetachedData]=useState(initialVal);
    const [isFetching , setIsFetching]=useState(false);
    useEffect(()=>{
        async function fetchData() {
            setIsFetching(true);
        try{ const places=await fetchFun();
           setFetachedData(places);
          }catch(error){
              setError({message: error.message || 'Failed to Fetch Data!'})
           }
           setIsFetching(false);
        }
        fetchData()
       },[fetchFun])
       return{
        error,
        fetchedData,
        setFetachedData,
        isFetching
       }
}