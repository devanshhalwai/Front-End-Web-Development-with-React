import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        toggle={this.props.toggleModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={this.props.toggleModal}>Login</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Label htmlFor="rating">Rating</Label>
            <Row className="form-group">
              <Col>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Label htmlFor="author">Your Name</Label>
            <Row className="form-group">
              <Col>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Full Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Label htmlFor="comment">Your Feedback</Label>
            <Row className="form-group">
              <Col>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    );
  }
}

function RenderDishdetails({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card key={dish.id}>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
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

  deletecomment(commentid) {
    console.log("delete request for" + commentid);
  }

  renderComments(comments, postComment, dishId, commentsisLoading) {
    if (comments != null) {
      return (
        <div className="col-12 col-md-5">
          <h4>Comments</h4>
          {comments.map((comment) => {
            if (commentsisLoading === false) {
              return (
                <ul key={comment.id} className="col-12">
                  <li className="list-unstyled">{comment.comment}</li>
                  <div className="row">
                    <p className="col-auto align-middle">
                      -- {comment.author} ,
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(comment.date)))}
                    </p> 
                    {/* <button
                      type="button"
                      className="btn btn-primary col-auto"
                      onClick={() => this.deletecomment(comment.id)}
                    >
                      //! Delete
                    </button> */}
                  </div>
                </ul>
              );
            } else {
              return <Loading />;
            }
          })}
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={this.toggleModal}
          >
            <span className="fa fa-pencil"></span> Submit Comment
          </button>
          <CommentForm
            isModalOpen={this.state.isModalOpen}
            toggleModal={this.toggleModal}
            dishId={dishId}
            postComment={postComment}
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
            {this.renderComments(
              this.props.comments,
              this.props.postComment,
              this.props.dish.id,
              this.props.commentsisLoading
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <Loading />
          </div>
        </div>
      );
    }
  }
}

export default Dishdetail;
