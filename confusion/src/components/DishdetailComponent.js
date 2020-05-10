import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
class Dishdetail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderDishdetails(dish) {
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
        }
        else return <div></div>;
    }
    renderComments(dish) {
        if (dish != null) {

            const custcomments = dish.comments.map((comment) => {
                return (
                    <ul key={comment.id} className="col-12">
                        <li className="my-2 list-unstyled">{comment.comment}</li>
                        <p className="my-4">-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                    </ul>
                );
            });

            return (
                <div className="col-12 col-md-5">
                    <h4>Comments</h4>
                    {custcomments}
                </div>
            );
        }
        else return <div></div>;
    }

    render() {

        return (
            <div className="row">
                {this.renderDishdetails(this.props.dish)}
                {this.renderComments(this.props.dish)}
            </div>
        );
    }
}

export default Dishdetail;