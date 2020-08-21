import React, { Component } from 'react';
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import { NEARBY_SATELLITE, STARLINK_CATEGORY, API_KEY } from '../constants';
import Axios from 'axios';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            setting: null,
            loadingSatellites: false
        }
    }

    // showNearbySatellite = (setting) => {
    //     this.fetchSatellite(setting);
    // }

    fetchSatellite = (setting) => {
        const { observerLat, observerLong, observerAlt, radius } = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${API_KEY}`;

        this.setState({
            loadingSatellites: true
        })

        Axios.get(url).then(response => {
            this.setState({
                satInfo: response.data,
                loadingSatellites: false
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
                    <SatelliteList satInfo={this.state.satInfo} loading={this.state.loadingSatellites} />
                </div>
                <div className="right-side">
                    right
                </div>
            </div>
        );
    }
}
export default Main;