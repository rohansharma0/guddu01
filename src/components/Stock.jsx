import React from "react";

import decreaseIcon from "../assets/decrease.png";
import increaseIcon from "../assets/increase.png";

const Stock = (props) => {
    return (
        <div
            style={{
                border: "1px solid black",
                padding: "1rem",
                margin: "1rem 0",
            }}>
            <p>
                <b>{props.stock.code} - </b>
                {props.stock.name}
            </p>
            <p>Current Price : {props.stock.curPrice}</p>
            <p>Opening Price : {props.stock.openPrice}</p>
            <p>High Price : {props.stock.highPrice}</p>
            <p>Change Today : {props.stock.changeToday} %</p>
            {props.stock.changeToday > 0 ? (
                <img src={increaseIcon} />
            ) : (
                <img src={decreaseIcon} />
            )}
            <br />
            <button onClick={() => props.remove(props.stock.code)}>
                Delete
            </button>
        </div>
    );
};

export default Stock;
