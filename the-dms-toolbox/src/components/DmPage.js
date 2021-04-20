import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
//pages
import CampaignPage from "./CampaignPage";
import Navbar from "./Navbar";
import CampList from "./CampList";
import Error from "./Error";

const URL = "http://localhost:9393/dm/";

export default class DmPage extends Component {

  state = {
    id: null,
    camps: []
  };

  componentDidMount() {
    this.setState({ id: this.props.id }, this.getDM());
  }

  setId = () => this.setState({id: this.props.dmId})
  

  getDM = () => {
       fetch(`${URL}${this.state.id}`)
         .then((res) => res.json())
         .then((data) =>
           this.setState({
             camps: data,
           })
         )
         .catch((e) => console.error("e:", e));
  }

  render() {

    //Todo[]make list prettier
    return (
      <>
        <Navbar />
        <Switch>
          <Route path='/campaign/:id' children={<CampaignPage />}></Route>
          <CampList camps={this.state.camps} />
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </>
    );
  }
}
