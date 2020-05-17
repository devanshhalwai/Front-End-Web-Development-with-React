import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCard(item, isLoading, errMess) {
    if (isLoading) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <Loading />
          </div>
        </div>
      );
    } else if (errMess) {
      return <h4>{errMess}</h4>;
    } else if(item!=null)
      return (
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      );
  }

  render() {
      return (
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-md">
                {this.renderCard(
                  this.props.dish,
                  this.props.dishesLoading,
                  this.props.dishErrMess
                )}
            </div>
            <div className="col-12 col-md">
              {this.renderCard(
                this.props.promotion,
                this.props.promoLoading,
                this.props.promoErrMess
              )}
            </div>
            <div className="col-12 col-md">
              {this.renderCard(
                this.props.leader,
                this.props.leaderLoading,
                this.props.leaderErrMess
              )}
            </div>
          </div>
        </div>
      );
  }
}

export default Home;
