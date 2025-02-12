import axios from "axios";
import React, { useEffect, useState } from "react";

import Stock from "../components/Stock";

const Home = () => {
    //Getting company stock name from API - https://finnhub.io/api/v1/search?q=${symbol}&token=${this.token}
    //get company name from the response
    //Getting company stock quote from API - https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${this.token}
    //get cuurent price, high price, open price, todays change from the response

    const [stockList, setStockList] = useState([]);

    const [stock, setStock] = useState({
        code: "",
        name: "",
        curPrice: 0,
        openPrice: 0,
        highPrice: 0,
        changeToday: 0,
    });

    const removeStock = (stockCode) => {
        const stList = stockList.filter((stock) => stock.code !== stockCode);
        setStockList(stList);

        const list = getStockCodeFromLS();
        const stCodeList = list.filter((code) => code !== stockCode);

        //saving into local storage
        localStorage.setItem("stockCode", JSON.stringify(stCodeList));
    };

    const API_KEY = "bu4f8kn48v6uehqi3cqg";

    const handleTrack = () => {
        const codeList = getStockCodeFromLS();
        codeList.push(stock.code);

        //saving into local storage
        localStorage.setItem("stockCode", JSON.stringify(codeList));

        //getting stock details
        getStockDetails(stock.code);
    };

    const getStockCodeFromLS = () => {
        const list = localStorage.getItem("stockCode");
        if (list === null || list.length === 0) return [];
        return JSON.parse(list);
    };

    const getStockDetails = async (code) => {
        console.log(code);

        try {
            // Fetch stock information
            const searchResponse = await axios.get(
                `https://finnhub.io/api/v1/search?q=${code}&token=${API_KEY}`
            );

            const stockInfo = searchResponse?.data?.result[0];
            if (!stockInfo) {
                throw new Error("Stock not found");
            }

            const st = {
                code: code,
                name: stockInfo.description,
            };

            // Fetch stock quote
            const quoteResponse = await axios.get(
                `https://finnhub.io/api/v1/quote?symbol=${code}&token=${API_KEY}`
            );

            const quoteData = quoteResponse.data;
            st.curPrice = Number(quoteData.c);
            st.openPrice = Number(quoteData.o);
            st.highPrice = Number(quoteData.h);
            st.changeToday = Number(quoteData.dp);

            // Update stock list
            setStockList((prevStockList) => [...prevStockList, st]);

            return st; // Return the stock details for further use
        } catch (error) {
            console.error("Error fetching stock details:", error);
            throw error; // Re-throw the error to handle it outside
        }
    };

    // Function to make multiple calls synchronously
    const getMultipleStockDetails = async (stockCodes) => {
        const results = [];

        for (const code of stockCodes) {
            try {
                const stockDetails = await getStockDetails(code);
                results.push(stockDetails);
            } catch (error) {
                console.error(`Failed to fetch details for ${code}:`, error);
            }
        }

        setStockList(results);
    };

    useEffect(() => {
        //getting local storage data
        const codeList = localStorage.getItem("stockCode");
        if (codeList === null || codeList.length === 0) return;

        const stCodeList = JSON.parse(codeList);

        getMultipleStockDetails(stCodeList);
    }, []);

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setStock({ ...stock, code: e.target.value })}
            />
            <button onClick={handleTrack}>Track</button>
            {stockList.map((st, i) => {
                return <Stock key={i} stock={st} remove={removeStock} />;
            })}
        </div>
    );
};

export default Home;
