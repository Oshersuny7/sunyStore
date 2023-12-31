import { Button, Card, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = ({ category, index }) => {
  const images = [
    "/images/shoes-nike-1.png",
    "/images/shoes-nike-2.png",
    "/images/shoes-adidas-1.png",
    "/images/shoes-adidas-2.png",
    "/images/shirts-nike-1.png",
    "/images/shirts-nike-2.png",
    "/images/shorts-nike-1.png",
    "/images/shorts-nike-2.png",
  ];
  return (
    <Col xs={12} md={6} lg={4} className="mb-4 offset">
      <Card className="h-100">
        <Card.Img
          className="img-fluid"
          style={{ height: "300px", width: "100%" }}
          crossOrigin="anonymous"
          variant="top"
          src={images[index]}
          alt="Product Image"
        />

        <Card.Body>
          <Card.Title>{category}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <LinkContainer to="/product-list">
            <Button variant="primary">Go to category</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default CategoryCardComponent;
