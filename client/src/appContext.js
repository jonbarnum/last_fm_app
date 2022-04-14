import React, { useState, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext()

function AppContextProvider(props){
    const [bandInfo, setBandInfo] = useState([])
    const [inputData, setInputData] = useState({
        artist: '',
        genre: '',
        url: '',
        img: ''
    })
    // const [savedBand, setSavedBand] = useState([])
    const [bands, setBands] = useState([])

    function getBands(){
        axios.get('http://localhost:8000/bands/')
        .then(response => setBands(response.data))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getBands()
    }, [])

    function handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        setInputData(prevData => ({...prevData, [name]: value}))
    }

    function handleSearch(event){
        event.preventDefault()
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${inputData.artist}&api_key=cb41d576aa71567c76b75feab99d7dcd&format=json&limit=10`)
        .then(response => {
            setBandInfo(response.data.results.artistmatches.artist)
        })
        .catch(error => console.log(error))
        setInputData({
            artist: ''
        })
    }

    
    return(
        <AppContext.Provider value={{
                handleSearch,
                bandInfo,
                handleChange,
                inputData,
                // savedBand,
                // setSavedBand,
                bands,
                setBands,
                getBands
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}