import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCard(item, isLoading, errMess) {
    if (isLoading) {
      return (
        <card>
          <Loading />
        </card>
      );
    } else if (errMess) {
      return <h4>{errMess}</h4>;
    } else
      return (
        <Card>
          <CardImg src={item.image} alt={item.name} />
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
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-md m-1">
              <Link
                to={`/menu/${this.props.dish.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {this.renderCard(
                  this.props.dish,
                  this.props.isLoading,
                  this.props.errMess
                )}
              </Link>
            </div>
            <div className="col-12 col-md m-1">
              {this.renderCard(
                this.props.promotion,
                this.props.isLoading,
                this.props.errMess
              )}
            </div>
            <div className="col-12 col-md m-1">
              {this.renderCard(
                this.props.leader,
                this.props.isLoading,
                this.props.errMess
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default Home;
