import  { useEffect } from 'react';

import SpotifyGetPlaylists from './SpotifyGetPlaylists';


// GET https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09

const CLIENT_ID = '9163fda1371a4c00b3dbaad54936a786';
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = 'https://spotify-react-rho.vercel.app/';
const SPACE_DELIMITER = '%20';
const SCOPES = ['user-read-currently-playing' , 'user-read-playback-state' ];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
//--------------------------------------------------------------//

//http://localhost:3000/webapp#access_token=BQAzyoSEyHi8FZbGk8Pf--NeI2uOfOjYX2vMcL3WU2xy__SG5GDOlhumeuSssP6UencYau2LLMxPyY_TGzWPK8M5sm6geIRmKoHkpHsN_0wQWJwM9H_c_IFPWQcAvV3uj29a2igzlepcndFU6WRBFcNH_8Jl7H66emwwY1pkFtY&token_type=Bearer&expires_in=3600

//Response Handler func
const getReturnParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split('&');
    const paramsSplitUp = paramsInUrl.reduce((accumulator , currentValue) =>{
       console.log(currentValue);
        const [key, value] = currentValue.split('=');
        accumulator[key] = value;
        return accumulator;
    }, {});
    return paramsSplitUp;
};




const WebApp = () => {

    //Calling of Response handler function using useeffect hook

    useEffect(() => {

        if(window.location.hash)
        var {access_token , expires_in, token_type}= getReturnParamsFromSpotifyAuth(window.location.hash);
        localStorage.clear();
        localStorage.setItem('accessToken' , access_token);
        localStorage.setItem('expiresIn' , expires_in);
        localStorage.setItem('tokenType' , token_type);
     } );





    //handlelogin fn definition

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }





    return (
        <div>
            <button onClick={handleLogin}>Log In to Spotify</button>
            <SpotifyGetPlaylists/>
            <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?theme=1/tracks?offset=0&limit=10" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
    )
}

export default WebApp
