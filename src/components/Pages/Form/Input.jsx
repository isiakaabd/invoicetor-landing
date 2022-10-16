import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { TextError } from './TextError';

const C = ({ type, name, placeholder, size, ...rest }) => {
  return (
    <Input
      type={type}
      size={size}
      name={name}
      htmlSize={80}
      placeholder={placeholder}
      bg={useColorModeValue('gray.100', 'gray.700') || 'gray.200'}
      color={useColorModeValue('gray.800', 'gray.300') || 'gray.800'}
      {...rest}
    />
  );
};
C.defaultProps = {
  type: 'text',
  size: 'lg',
};
C.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
const Inputs = props => {
  const { name, type, value, placeholder, size, ...rest } = props;
  return (
    <>
      <FormControl id={name}>
        <FormLabel>{placeholder}</FormLabel>
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
Inputs.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Inputs;
