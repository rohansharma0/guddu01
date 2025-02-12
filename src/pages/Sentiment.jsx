import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const Sentiment = () => {
    const [stockCode, setStockCode] = useState("");
    const [sentiments, setSentiments] = useState([]);

    let params = useParams();
    const API_KEY = "bu4f8kn48v6uehqi3cqg";
    useEffect(() => {
        let stCde = params.stockCode;
        setStockCode(stCde);

        //get qoute details
        getQuoteDetails();
    }, [sentiments]);

    const getQuoteDetails = async () => {
        const date = new Date();
        const currentDate = date.toISOString().substring(0, 10);
        const previousDateObj = new Date(date.setMonth(date.getMonth() - 4));
        const previousDate = previousDateObj.toISOString().substring(0, 10);
        try {
            // Fetch stock information
            const url = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${stockCode}&from=${previousDate}&to=${currentDate}&token=${API_KEY}`;

            const searchResponse = await axios.get(url);

            const stockInfo = searchResponse?.data;
            if (!stockInfo) {
                throw new Error("Stock not found");
            }
            setSentiments(searchResponse?.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            {stockCode}
            <br />
            {JSON.stringify(sentiments)}
            <br />
            <Link to="/">Go Back</Link>
        </div>
    );
};

export default Sentiment;
