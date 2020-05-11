import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from 'react-router-dom';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCard(item) {
    if (item != null) {
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
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <Link to={`/menu/${this.props.dish.id}`} style={{ textDecoration: 'none' ,color: 'black'}} >
              {this.renderCard(this.props.dish)}
            </Link>
          </div>
          <div className="col-12 col-md m-1">
            {this.renderCard(this.props.promotion)}
          </div>
          <div className="col-12 col-md m-1">
            {this.renderCard(this.props.leader)}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
