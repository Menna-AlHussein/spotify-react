import axios from 'axios';
import { useState , useEffect } from 'react';

const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?offset=0&limit=10';
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks`;



const SpotifyGetPlaylists = () => {

    const [token, setToken] = useState('');
    const [data, setData] = useState({});


    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            setToken(localStorage.getItem('accessToken'));
        }

    }, []);

    //function the will handle the playlists 

    const handleGetPlaylists = () => {
        axios.get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token ,
            },
        }).then(response => {
            console.log(JSON.response);
            setData(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    };







    return (
        <>
            <button onClick={handleGetPlaylists}>Get PlayLists</button>
            {
            data?.items? data.items.map((item) => <p>{item.track.name}</p>) : null 
             }
        </>
        
    );
}

export default SpotifyGetPlaylists
