import Places from './Places.jsx';
import ErrorTag from './ErrorTag.jsx'
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';
async function fetchSortedPlaces(){
const places= await fetchAvailablePlaces();
return new Promise((resolve)=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    const sortedPlaces=sortPlacesByDistance
    (places,
     position.coords.latitude,
     position.coords.longitude
    );
    resolve(sortedPlaces);
})
})
}
export default function AvailablePlaces({ onSelectPlace }) {

   const{error , fetchedData: availablePlaces , isFetching : isFetchingData}=useFetch(fetchSortedPlaces , [])

  if(error){
    return <ErrorTag title="An error occurred!" message={error.message}/>
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetchingData}
      loadingText="Fetching places data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
