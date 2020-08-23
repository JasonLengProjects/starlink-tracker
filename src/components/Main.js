import React, { Component } from 'react';
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";
import { NEARBY_SATELLITE, STARLINK_CATEGORY, API_KEY } from '../constants';
import Axios from 'axios';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            setting: null,
            loadingSatellites: false,
            selected: [],
        }
    }

    // showNearbySatellite = (setting) => {
    //     this.fetchSatellite(setting);
    // }

    trackOnClick = () => {
        console.log(`Tracking ${this.state.selected}`);
    }

    addOrRemove = (item, status) => {
        // let list = this.state.selected;
        let { selected: list } = this.state;
        const found = list.some(entry => entry.satid === item.satid);

        if (status && !found) {
            list.push(item);
        }

        if (!status && found) {
            list = list.filter(entry => {
                return entry.satid !== item.satid;
            });
        }

        console.log(list);

        this.setState({
            selected: list
        });
    }

    fetchSatellite = (setting) => {
        const { observerLat, observerLong, observerAlt, radius } = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${API_KEY}`;

        this.setState({
            loadingSatellites: true
        })

        Axios.get(url).then(response => {
            this.setState({
                satInfo: response.data,
                loadingSatellites: false,
                selected: []
            })
        })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
                this.setState({
                    loadingSatellites: false
                })
            })
    }



    render() {
        return (
            <div className='main'>
                <div className="left-side">
                    <SatSetting onShow={this.fetchSatellite} />
                    <SatelliteList
                        satInfo={this.state.satInfo}
                        loading={this.state.loadingSatellites}
                        trackOnClick={this.trackOnClick}
                        disableTrack={this.state.selected.length === 0}
                        onSelectionChange={this.addOrRemove} />
                </div>
                <div className="right-side">
                    <WorldMap />
                </div>
            </div>
        );
    }
}
export default Main;