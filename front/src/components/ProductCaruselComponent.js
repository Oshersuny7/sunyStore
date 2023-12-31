import {Carousel} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const  ProductCaruselComponent=()=> {
    const cursorP={
     cursor:"pointer"   
    }
    return(
    <Carousel >
      <Carousel.Item>
        <img 
          crossOrigin='anonymous'
          className='d-block w-100 col-2    '
          style={{height:"300px",objectFit:"cover"}}
          src='/images/shoes-nike-2.png'
          alt='First slide'
        />
        <Carousel.Caption>
            <LinkContainer style={cursorP} to="/product-details">
             <h3 className='text-muted'>Best sellers in shoes category</h3>

            </LinkContainer>
          <p className='text-secondary h3'>nike Air Force 1 '07 LV8/men</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          style={{height:"300px",objectFit:"cover"}}
          src='/images/shirts-nike-1.png'
          alt='Second slide'
        />
        <Carousel.Caption>
        <LinkContainer style={cursorP} to="/product-details">
             <h3>Best sellers in shirts category</h3>

            </LinkContainer>
          <p>Nike </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          style={{height:"300px",objectFit:"cover"}}
          src='/images/shorts-nike-2.png'
          alt='Third slide'
        />
        <Carousel.Caption>
        <LinkContainer style={cursorP} to="/product-details">
             <h3>Best sellers in shorts category</h3>

            </LinkContainer>
          <p>Nike Tech</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProductCaruselComponent;