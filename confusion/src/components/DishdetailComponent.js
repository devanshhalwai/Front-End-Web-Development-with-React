import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

function RenderDishdetails({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card key={dish.id}>
          <CardImg width="100%" top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else return <div></div>;
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  renderComments(comments) {
    if (comments != null) {
      return (
        <div className="col-12 col-md-5">
          <h4>Comments</h4>
          {comments.map((comment) => {
            return (
              <ul key={comment.id} className="col-12">
                <li className="my-2 list-unstyled">{comment.comment}</li>
                <p className="my-4">
                  -- {comment.author} ,{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </ul>
            );
          })}
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={this.toggleModal}
          >
            <span class="fa fa-pencil"></span> Submit Comment
          </button>
          <CommentForm
            isModalOpen={this.state.isModalOpen}
            toggleModal={this.toggleModal}
          />
        </div>
      );
    } else return <div></div>;
  }

  render() {
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row my-2">
            <RenderDishdetails dish={this.props.dish} />
            {this.renderComments(this.props.comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Dishdetail;
