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

  renderLoading(dishesLoading,promoLoading,leaderLoading)
  {
    if(dishesLoading || promoLoading || leaderLoading) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <Loading />
          </div>
        </div>
      );
    } else {
      return(<div></div>);
    }
  }
  renderCard(item, errMess) {
    if (errMess) {
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
          <div className="row align-items-start my-2">
            {this.renderLoading(
              this.props.dishesLoading,
              this.props.promoLoading,
              this.props.leaderLoading,
            )}
            <div className="col-12 col-md">
                {this.renderCard(
                  this.props.dish,
                  this.props.dishErrMess
                )}
            </div>
            <div className="col-12 col-md">
              {this.renderCard(
                this.props.promotion,
                this.props.promoErrMess
              )}
            </div>
            <div className="col-12 col-md">
              {this.renderCard(
                this.props.leader,
                this.props.leaderErrMess
              )}
            </div>
          </div>
        </div>
      );
  }
}

export default Home;
