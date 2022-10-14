import { FormControl, Textarea, useColorModeValue } from '@chakra-ui/react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { TextError } from './TextError';

const C = ({ name, placeholder, ...rest }) => {
  return (
    <Textarea
      name={name}
      placeholder={placeholder}
      bg={useColorModeValue('gray.100', 'gray.700') || 'gray.200'}
      color={useColorModeValue('gray.800', 'gray.300') || 'gray.800'}
      {...rest}
    />
  );
};
C.defaultProps = {
  size: 'lg',
};
C.propTypes = {
  name: PropTypes.string,
};
const TextArea = props => {
  const { name, type, value, placeholder, size, ...rest } = props;
  return (
    <>
      <FormControl id={name}>
        <Field
          as={C}
          id={name}
          name={name}
          type={type}
          size={size}
          placeholder={placeholder}
          {...rest}
        />
      </FormControl>

      <ErrorMessage name={name} component={TextError} />
    </>
  );
};
TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default TextArea;
