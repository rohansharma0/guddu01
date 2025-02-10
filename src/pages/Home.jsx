import axios from "axios";
import React, { useState } from "react";

import Stock from "../components/Stock";

const Home = () => {
    //Getting company stock name from API - https://finnhub.io/api/v1/search?q=${symbol}&token=${this.token}
    //get company name from the response
    //Getting company stock quote from API - https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${this.token}
    //get cuurent price, high price, open price, todays change from the response

    const [stockList, setStockList] = useState([]);
    // const [stockCodeList, setStockCodeList] = useState([]);

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
    };

    const API_KEY = "bu4f8kn48v6uehqi3cqg";

    const handleTrack = () => {
        // setStockCodeList([...stockCodeList, stock.code]);
        getStockDetails();
    };

    const getStockDetails = async () => {
        await axios
            .get(
                "https://finnhub.io/api/v1/search?q=" +
                    stock.code +
                    "&token=" +
                    API_KEY
            )
            .then(async (response) => {
                const st = stock;
                st.name = response?.data?.result[0]?.description;
                await axios
                    .get(
                        "https://finnhub.io/api/v1/quote?symbol=" +
                            stock.code +
                            "&token=" +
                            API_KEY
                    )
                    .then((response) => {
                        st.curPrice = Number(response.data.c);
                        st.openPrice = Number(response.data.o);
                        st.highPrice = Number(response.data.h);
                        st.changeToday = Number(response.data.dp);
                        setStockList([...stockList, st]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

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
