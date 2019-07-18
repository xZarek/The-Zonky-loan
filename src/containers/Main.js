import React, { Component } from 'react';
import { ItemsWrapper, ButtonRating } from '../components';
import agent from '../agent';
import '../css/main.css';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            averageLoan: 0,
            selectedRating: '',
            selected: false,
            loans: [],
            emptyArray: false,

        };
    }
    componentDidMount() {

        agent.Marketplace.getLoan()
            .then(res => {
                this.setState({ loans: res, loaded: true });
            })
            .catch(err => {
                console.warn('Api se nezavolalo:', err);
            });
    }

    chooseRating = (rating) => {
        const { loans } = this.state;
        let summaryLoans = [];
        summaryLoans = loans.filter(loan => loan.rating === rating);
        const arrayOfAmount = summaryLoans.map(loan => loan.amount)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const sumTogether = arrayOfAmount.length > 0 && arrayOfAmount.reduce(reducer)
        const averageLoan = sumTogether / Number(arrayOfAmount.length)
        this.setState({ selected: true, selectedRating: rating, averageLoan: sumTogether ? Math.round(averageLoan, 2).toFixed(2) : 0, emptyArray: !sumTogether })
    }
    ratingColor = (rating) => {
        console.log('rating', rating);
        switch (rating) {
            case 'AAAAAA':
                return "purple"
            case 'AAAAA':
                return "slateblue"
            case 'AAAA':
                return "blue"
            case 'AAA':
                return "cadetblue"
            case 'AAE':
                return "darkgreen"
            case 'AA':
                return "palegreen"
            case 'AE':
                return "palegoldenrod"
            case 'A':
                return "burlywood"
            case 'B':
                return "darksalmon"
            case 'C':
                return "orangered"
            case 'D':
                return "darkred"
            default:
                return
        }
    }
    render() {
        const { selected, selectedRating, averageLoan, emptyArray } = this.state;
        if (!this.state.loaded) {
            return (


                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

            );
        }
        return (
            <div>

                <div className="wrapper">

                    <h2>Výpočet průměrné půjčky</h2>

                    <ItemsWrapper label="Půjčka">
                        <ButtonRating label="2,99" value="AAAAAA" addClass="purple" click={this.chooseRating} />
                        <ButtonRating label="3,99" value="AAAAA" addClass="slateblue" click={this.chooseRating} />
                        <ButtonRating label="4,99" value="AAAA" addClass="blue" click={this.chooseRating} />
                        <ButtonRating label="5,99" value="AAA" addClass="cadetblue" click={this.chooseRating} />
                        <ButtonRating label="6,99" value="AAE" addClass="darkgreen" click={this.chooseRating} />
                        <ButtonRating label="8,49" value="AA" addClass="palegreen" click={this.chooseRating} />
                        <ButtonRating label="9,49" value="AE" addClass="palegoldenrod" click={this.chooseRating} />
                        <ButtonRating label="10,99" value="A" addClass="burlywood" click={this.chooseRating} />
                        <ButtonRating label="13,49" value="B" addClass="darksalmon" click={this.chooseRating} />
                        <ButtonRating label="15,49" value="C" addClass="orangered" click={this.chooseRating} />
                        <ButtonRating label="19,99" value="D" addClass="darkred" click={this.chooseRating} />
                    </ItemsWrapper>
                    {selected && <div>
                        <div>Vybrán rating: <b className={this.ratingColor(selectedRating)}>{selectedRating}</b></div>
                        <div>{emptyArray ? "Na vybraný rating není vedena žádná půjčka" : ""}</div>
                        <div>Průměrná půjčka: <b>{!emptyArray ? averageLoan.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0} Kč</b></div>
                    </div>}
                </div>
            </div >
        )
    }

}

export default Main