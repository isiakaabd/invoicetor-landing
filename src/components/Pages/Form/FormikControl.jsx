import Inputs from './Input';
import PropTypes from 'prop-types';
import Date from './Date';
import TextArea from './TextArea';
const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Inputs {...rest} />;
    case 'textarea':
      return <TextArea {...rest} />;
    case 'date':
      return <Date {...rest} />;
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string,
};
FormikControl.defaultProps = {
  control: 'input',
};
export default FormikControl;
