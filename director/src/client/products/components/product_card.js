import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Image,
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

const ProductCard = ({
  product,
  pictures,
  pictureIndex,
  onPictureChange,
  brandImage,
  categoryName,
}) => (
  <Card>
    <Image src={pictures[pictureIndex]} />
    <Card.Content>
      <Card.Header>{product.name}</Card.Header>
      <Card.Meta>{product.name_eng}</Card.Meta>
      <Card.Description><ReactMarkdown source={product.description} /></Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Image src={brandImage} />
      {categoryName}
    </Card.Content>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  pictureIndex: PropTypes.number,
  onPictureChange: PropTypes.func.isRequired,
  brandImage: PropTypes.string,
  categoryName: PropTypes.string,
};

ProductCard.defaultProps = {
  pictureIndex: 0,
  brandImage: '',
  categoryName: '',
};

export default ProductCard;
