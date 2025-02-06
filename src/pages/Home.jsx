import axios from "axios";
import React, { useState } from "react";

const Home = () => {
    //Getting company stock name from API - https://finnhub.io/api/v1/search?q=${symbol}&token=${this.token}
    //get company name from the response
    //Getting company stock quote from API - https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${this.token}
    //get cuurent price, high price, open price, todays change from the response

    const [stockCode, setStockCode] = useState("");

    const API_KEY = "bu4f8kn48v6uehqi3cqg";

    function handleInputChange(event) {
        setStockCode(event.target.value);
    }

    function handleTrack() {
        console.log("Tracking stock code: ", stockCode);
        getCompanyName();
        getCompanyQuote();
    }
    function getCompanyName() {
        axios
            .get(
                "https://finnhub.io/api/v1/search?q=" +
                    stockCode +
                    "&token=" +
                    API_KEY
            )
            .then(function (response) {
                console.log(response?.data?.result[0]?.description);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function getCompanyQuote() {
        axios
            .get(
                "https://finnhub.io/api/v1/quote?symbol=" +
                    stockCode +
                    "&token=" +
                    API_KEY
            )
            .then(function (response) {
                console.log("Current Price - " + response.data.c);
                console.log("Opening Price - " + response.data.o);
                console.log("High Price Of The Day - " + response.data.h);
                console.log("Percent Change - " + response.data.dp);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <input type="text" onChange={handleInputChange} />
            <button onClick={handleTrack}>Track</button>
        </div>
    );
};

export default Home;
