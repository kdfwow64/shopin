import * as React from "react";
import { scrollPosition, resizeListeners } from "components/atoms";
import {
    googleMapApiKey as GOOGLE_MAPS_API_KEY
} from "core/constants";

export interface MapChartProps {
    data?: any;
}

export interface MapChartState {
}

const INITIAL_PROPS: MapChartProps = {
    data: {}
};

const INITIAL_STATE: MapChartState = {
};

export class MapChart extends React.Component<MapChartProps, MapChartState>
{
    public static defaultProps = INITIAL_PROPS;
    private static _initializing: Promise<any>;

    private _el: HTMLElement;
    private _chart: any;
    private _ignoreNextResize: boolean = false;
    public data: any;

    constructor(props: MapChartProps) {
        super(props);

        this.state = INITIAL_STATE;
    }

    public componentDidMount() {
        if (!this._el) return;

        resizeListeners.push(() => {
            if ( this._ignoreNextResize ) {
                this._ignoreNextResize = false;
                return;
            }
            
            this.drawMap(this.props)
        });
    }

    public componentWillReceiveProps(newProps: MapChartProps) {
        if (newProps.data && newProps.data != this.props.data) {
            this.drawMap(newProps);
        }
    }

    public static init() {
        if (this._initializing) return this._initializing;

        this._initializing = new Promise((resolve) => {
            (google as any).charts.load('current', {
                'packages': ['geochart'],
                'mapsApiKey': GOOGLE_MAPS_API_KEY
            });

            (google as any).charts.setOnLoadCallback(resolve);
        });

        return this._initializing;
    }

    public async drawMap(props: MapChartProps) {
        await MapChart.init();

        const maxWidth = 960;
        const maxHeight = 500;
        const winWidth = scrollPosition.w;

        const scale = winWidth < maxWidth ? winWidth / maxWidth : 1;
        const width = maxWidth * scale;
        const height = maxHeight * scale;

        const margin = `${((height * 1.3) - height)}px`;

        Object.assign(this._el.style, {
            marginBottom: margin
        });

        const COLOR = "#cde2ff";
        const chart = new (google as any).visualization.GeoChart(this._el);
        let d = [];

        /* const dummyData = {
            'au': {
                totalCount: 8
            }
        }; */
        // Check for empty object, fallback condition
        if (Object.keys(props.data).length === 0 && props.data.constructor === Object) {
            d = [];
        } else {
            for (let countryCode in props.data) {
                if (countryCode !== '00') {
                    const { name, totalCount } = props.data[countryCode];

                    if ( !name || !totalCount ) continue

                    d.push([name, totalCount]);  
                }
                
            }
        }

        const dataMap = d.reduce((acc, region) => {
            const [name, value] = region;

            acc[name] = { name, value };

            return acc;
        }, {});

        const data = (google as any).visualization.arrayToDataTable([
            ['Country', 'Popularity'],
            ...d
        ]);
        const options = {
            defaultColor: COLOR,
            datalessRegionColor: COLOR,
            legend: "none",
            displayMode: "text",
            magnifyingGlass: false,
            tooltip: "none",
            width,
            height
        };


        const updateMarkers = () => {
            const textEls = this._el.querySelectorAll("text");

            for (let i = 0; i < textEls.length; ++i) {
                const textEl = textEls[i] as any;
                const x = textEl.getAttribute("x");
                const y = textEl.getAttribute("y");
                const countryName = textEl.innerHTML;
                const mark = document.createElement("div");

                mark.classList.add("map-chart__marker");

                mark.innerHTML = `${dataMap[countryName].value}`;

                this._el.appendChild(mark);

                const mW = mark.offsetWidth;
                const mY = mark.offsetHeight;
                const hmW = (mW / 2) + 6;
                const pad = `${(mW - mY) / 2}`;

                Object.assign(mark.style, {
                    top: `${y - hmW}px`,
                    left: `${x - hmW}px`,
                    paddingTop: pad,
                    paddingBottom: pad
                });

                textEl.innerHTML = `${dataMap[countryName].value}`;
            }
        };

        (google as any).visualization.events.addListener(chart, 'ready', () => {
            updateMarkers();
            this._ignoreNextResize = true;

            window.dispatchEvent(new Event("resize"));
        });

        chart.draw(data, options)
    }

    public render() {
        return (
            <div className="map-chart" ref={el => {
                if (!el || this._el) return;

                this._el = el;
            }}>
                MapChart
   </div>
        )
    }
}
