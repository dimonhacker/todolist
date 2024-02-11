import React, {useState} from 'react';
import Button from "./Button";

type MoneyArray = {
    moneys:Array<MoneyType>
}
type MoneyTypeS = "RUBLS" | "Dollars" | "All"

type  MoneyType = {
    banknots: string,
    value: number,
    number: string
}
const MoneyComponent = (props:MoneyArray) => {
    let [filter, setFilter] = useState<MoneyTypeS>("All")
    const OnClickFilterHandler = (type:MoneyTypeS)=>{
        setFilter(type)
    }
    let curMoney = props.moneys.filter(value => {
            if (filter !== "All")
                return value.banknots === filter
            else return true
        }
    )
    return (
        <>
            <ul>
                {curMoney.map((value, index) => {
                    return (<li key={index}>
                        <span> {value.banknots}</span>
                        <span> {value.value}</span>
                        <span> {value.number}</span>
                    </li>);
                })}
            </ul>
            <Button name={"all"} callback={()=>OnClickFilterHandler("All")}/>
            <Button name={"RUB"} callback={()=>OnClickFilterHandler("RUBLS")}/>
            <Button name={"Dollars"} callback={()=>OnClickFilterHandler("Dollars")}/>
        </>
    );
};

export default MoneyComponent;