import * as React from "react";
import { View } from "components/atoms";
import { DonutChart } from "./DonutChart";

/*
Tokens (in MM)

Team Tokens	366	24.42%	dark green
Employee Option Pool	49.5	3.30%	light green
Seed Investors & Advisors	79.2	5.28%	orange
Token Sale	495	33%	blue
Partner & Community Incentive Tokens	495	33%	yellow
Ethereum foundation developers	15	1%	purple



Business and corporate development, and operations	15%	blue
Software, engineering, data science	50%	green
Marketing expenses, sponsorships, PR	30%	orange
Legal, operation, accounting	5%	purple
*/

const dataset1 = [{
    series: "Token Sale",
    lineOne: "33.00%",
    //lineOne: "20.00% / 80M BXK",
    value: 33,
    color: "#008aff" // Blue
}, {
    series: "Ethereum Foundation Developers",
    lineTwo: "1.00%",
    //lineOne: "10.00% / 40M BXK",
    value: 1,
    color: "#a8a8ff" // Purple
}, {
    series: "Partner & Community Incentive Tokens",
    lineTwo: "33.00%",
    //lineOne: "35.00% / 140M BXK",
    //lineTwo: "(Institutional Investors)",
    value: 33,
    color: "#ffbb00" // Yellow
}, {
    series: "Seed Investors & Advisors",
    lineTwo: "5.28%",
    //lineOne: "10.00% / 40M BXK",
    value: 5.28,
    color: "#ff8a00" // Orange
}, {
    series: "Employee Option Pool",
    lineTwo: "3.0%",
    //lineOne: "12.50% / 50M BXK",
    value: 3.30,
    color: "#29e9a4" // Light Green
}, {
    series: "Team Tokens",
    lineOne: "24.42%",
    //lineOne: "12.50% / 50M BXK",
    value: 24.42,
    color: "#35cc65" // Dark Green
}];

/*
Business and corporate development, and operations	15%	blue
Software, engineering, data science	50%	green
Marketing expenses, sponsorships, PR	30%	orange
Legal, operation, accounting	5%	purple
*/
const dataset2 = [{
    series: "Business & Corporate Development, Operations",
    lineTwo: "15%",
    value: 15,
    color: "#008aff",
    width: 240 
}, {
    series: "Legal, Accounting",
    lineTwo: "5%",
    value: 5,
    color: "#a8a8ff",
    width: 180 
}, {
    series: "s",
    value: 0,
    color: "#ffbb00",
    width: 180  // Yellow
}, {
    series: "Marketing Expenses, Sponsorships, PR",
    lineTwo: "30%",
    value: 30,
    color: "#ff8a00",
    width: 180 
}, {
    series: "",
    lineTwo: "30%",
    value: 0,
    color: "#29e9a4",
    width: 180  // Light Green
}, {
    series: "Software Engineering, Data Science",
    lineTwo: "50%",
//    lineTwo: "(Institutional Investors)",
    value: 50,
    color: "#35cc65",
    width: 180 
}];

export interface ChartProps {
}

export interface ChartState {
    data: any;
    entered?: boolean;
}

const INITIAL_PROPS: ChartProps = {
};

const INITIAL_STATE: ChartState = {
    data: dataset1,
    entered: false
};

export class Chart extends React.Component<ChartProps, ChartState>
{
 public static defaultProps = INITIAL_PROPS;

 private _svg: any;

 constructor ( props: ChartProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 public render ()
 {
    const firstSelected = this.state.data == dataset1;

  return (
    <View className="shpn-funding-chart" onEnter={() => this.setState({ entered: true })}>
        <div className="vertical center layout pad__b-6">
            <div className="shpn-funding-cart__actions horizontal center layout">
                <button className={`button-primary ${firstSelected ? "": "idle"}`} onClick={() => this.setState({ data: dataset1 })}>Token Allocation</button>
                <button className={`button-primary ${!firstSelected ? "": "idle"}`} onClick={() => this.setState({ data: dataset2 })}>Use of Proceeds</button>
            </div>
        </div>
        <DonutChart data={this.state.data} height={650} active={this.state.entered} />
    </View>
  );
 }
}
