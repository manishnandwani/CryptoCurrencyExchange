import { useEffect, useState } from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import styles from "./CryptoConverter.module.css";
import arrow from "../../assets/arrows.svg";

const END_POINT = import.meta.env.VITE_API_END_POINT;
const CryptoConverter = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [current, setCurrent] = useState({
    crypto: "BTC",
    currency: "USD",
    amount: "1",
  });

  const [exchangeValue, setExchangeValue] = useState("");
  const [error, setError] = useState("");

  const getCryptoCurrencies = async () => {
    const response = await fetch(`${END_POINT}/api/data`).then((res) =>
      res.json()
    );
    if(response){
        setCryptoCurrencies(response);
    }else{
        setError('Something went wrong, please try again')
    }
  };

  const getCurrencies = async () => {
    const response = await fetch(`${END_POINT}/api/currency/data`).then((res) =>
      res.json()
    );
    if(response){
        setCurrencies(response);
    }else{
        setError('Something went wrong, please try again')
    }
  };

  useEffect(() => {
    getCryptoCurrencies();
    getCurrencies();
  }, []);

  const exchangeCurrency = async () => {
    const response = await fetch(`${END_POINT}/api/exchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(current),
    }).then((res) => res.json());

    if (response && response[0]?.quote?.[current.currency]?.price)
      setExchangeValue(
        response[0]?.quote?.[current.currency]?.price.toFixed(2)
      );
    else{
        setError('Something went wrong, please try again')
    }
  };

  useEffect(() => {
    exchangeCurrency();
  }, [current]);

  const updateExchangeValues = (value, type) => {
    if (!value || value == 0) {
      if (type === "amount") setError("Amount cannot be less than 1");
      else if (type === "crypto") setError("Select any one option");
      else setError("Select any one option");
    } else {
      setError("");
    }
    setCurrent({ ...current, [type]: value });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["input-container"]}>
        <input
          type="number"
          value={current.amount}
          onChange={(e) => updateExchangeValues(e.target.value, "amount")}
          className={styles["form-input"]}
        />
        <MultiSelect
          list={cryptoCurrencies}
          updateExchangeValues={updateExchangeValues}
          type="crypto"
        />
        <div className={styles["btn-container"]}>
          <button>
            <img className={styles["image"]} src={arrow} />
          </button>
        </div>
        <MultiSelect
          list={currencies}
          updateExchangeValues={updateExchangeValues}
          type="currency"
        />
        {error && <div className={styles["error"]}>{error}</div>}
      </div>
      {!error && (
        <div className={styles["amount-section"]}>
          {current.amount} {current.crypto} = {exchangeValue} {current.currency}
        </div>
      )}
    </div>
  );
};

export default CryptoConverter;
