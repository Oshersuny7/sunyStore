import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCaruselComponent from "../components/ProductCaruselComponent";
import { Row, Container } from "react-bootstrap";

const HomePage = () => {
  const categories = [
    "Shoes",
    "Shoes",
    "Shoes",
    "Shoes",
    "Shirts",
    "Shirts",
    "Shorts",
    "Shorts",
  ];
  return (
    <>
      <ProductCaruselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {categories.map((category, index) => (
            <CategoryCardComponent
              key={index}
              category={category}
              index={index}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
