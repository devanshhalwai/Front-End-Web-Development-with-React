import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  rendermenu(dishes, isLoading, errMess) {
    if (isLoading) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <Loading />
          </div>
        </div>
      );
    } else if (errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{errMess}</h4>
            </div>
          </div>
        </div>
      );
    } else {
      return dishes.map((dish) => {
        return (
          <div className="col-12 col-md-3 my-2">
            <Card key={dish.id}>
              <Link to={`/menu/${dish.id}`}>
                <CardBody>
                  <div className="row justify-content-center">
                    <CardTitle>{dish.name}</CardTitle>
                  </div>
                </CardBody>
                <CardImg
                  width="100%"
                  src={baseUrl + dish.image}
                  alt={dish.name}
                />
              </Link>
            </Card>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
        <div className="row my-3 align-items-center">
          {this.rendermenu(
            this.props.dishes,
            this.props.isLoading,
            this.props.errMess
          )}
        </div>
      </div>
    );
  }
}

export default Menu;
