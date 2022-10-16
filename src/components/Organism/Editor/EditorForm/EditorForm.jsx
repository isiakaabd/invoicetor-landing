import { memo, useContext, useEffect } from 'react';
import { Form, Formik, useFormik } from 'formik';
import { Box, Flex, Button, Spacer, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { InvoiceContext } from 'core/InvoiceContext';
import * as RiIcons from 'react-icons/ri';
import UserDetails from './UserDetails';
import ClientDetails from './ClientDetails';
import InvoiceItems from './InvoiceItems';
import InvoiceNotes from './InvoiceNotes';
import InvoiceTerms from './InvoiceTerms';
import InvoiceDates from './InvoiceDates';
import InvoiceImage from './InvoiceImage';
import DigitalSignature from './DigitalSignature';
import { useCallback } from 'react';

const EditorForm = () => {
  const toast = useToast();
  const statuses = ['success', 'error', 'warning', 'info'];

  // aleart message
  const alertMessage = useCallback((message, status) => {
    toast({
      status: statuses.includes(status) ? status : 'info',
      title: message,
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
    });
    // eslint-disable-next-line
  }, []);
  const { invoice, setInvoice } = useContext(InvoiceContext);

  // getting the context from the provider

  const handleFormSubmit = useCallback(values => {
    const {
      yourDetails,
      backgroundColor,
      clientDetails,
      digitalSignature,
      invoiceDataValues,
      yourLogo,
      items,
      tax,
      notes,
      terms,
      // clientCompany,
    } = values;

    const data = {
      yourLogo,
      yourDetails,
      clientDetails,
      items,
      invoiceDataValues,
      tax,
      notes,
      terms,
      digitalSignature,
      backgroundColor,
    };
    setInvoice(values);
    localStorage.setItem('invoicetor', JSON.stringify(data));
    alertMessage('Invoice saved successfully', 'success');
    // eslint-disable-next-line
  }, []);
  const { handleSubmit, values } = useFormik({
    initialValues: { invoice },
  });

  // show  last error using toast
  const showError = useCallback(errors => {
    if (Object.keys(errors).length === 0) return;
    else {
      const arr = Object.values(errors);
      const lastError = arr[arr.length - 1];

      if (typeof lastError === 'object') {
        const y = Object.values(lastError);
        alertMessage(y[y.length - 1], 'error');
      } else {
        alertMessage(lastError, 'error');
      }
    }

    //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('invoicetor', JSON.stringify(invoice));
  }, [invoice]);

  useEffect(() => {
    const handler = e => {
      if (e.ctrlKey && e.keyCode === 83) {
        // check if the user is on the invoice page or not
        if (window.location.pathname === '/one-time-editor') {
          e.preventDefault();
          // handleSubmit();
          console.log(values);
        }
      }

      if (e.ctrlKey && e.keyCode === 82) {
        // check if the user is on the invoice page or not
        if (window.location.pathname === '/one-time-editor') {
          e.preventDefault();
          clearAllData();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice, handleSubmit]);

  // Upload Image in localstorage ends

  // Clear All Data
  const clearAllData = useCallback(() => {
    setInvoice({
      yourLogo: {
        image: '',
        imageSize: '150',
      },
      yourDetails: {
        yourCompany: '',
        yourName: '',
        yourAddress: '',
        yourCity: '',
        yourWebsite: '',
        yourEmail: '',
        yourPhone: '',
        yourBank: '',
        yourAccountNumber: '',
        yourBankBranch: '',
        yourRegistrationNumber: '',
      },
      clientDetails: {
        clientName: '',
        clientAddress: '',
        clientCity: '',
        clientWebsite: '',
        clientEmail: '',
        clientPhone: '',
        clientCompany: '',
      },
      invoiceDataValues: {
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
      },
      items: [],
      notes: {
        note: '',
        noteToggle: true,
      },
      terms: {
        term: '',
        termToggle: true,
      },
      digitalSignature: {
        signature: '',
        signatureSize: '100',
        signatureToggle: true,
        sealColor: 'red.400',
      },
    });

    localStorage.removeItem('invoicetor');
    alertMessage('Invoice cleared successfully', 'success');
    //eslint-disable-next-line
  }, []);

  const validationSchema = Yup.object({
    clientDetails: Yup.object().shape({
      clientName: Yup.string('Enter Your First Name')
        .strict()
        .matches(/^[A-Za-z]+$/, 'Name Should Always Be In Letters')
        .trim()
        .required('Client Name  Is Required'),
      clientCompany: Yup.string('Enter Your Client Company Name').trim(),
      clientAddress: Yup.string('Enter Your client Address Name').trim(),
      clientCity: Yup.string('Enter Your Client City Name').trim(),
      clientWebsite: Yup.string('Enter Your Client Comapny URL').trim(),
      clientEmail: Yup.string('Enter Your Client Email Address')
        .trim()
        .email('Enter Client Valid Email')
        .required('Client Email Is Required'),
      clientPhone: Yup.number('Enter Client Phone Number').typeError(
        'Must Be a Valid Phone Number'
      ),
    }),
    yourDetails: Yup.object().shape({
      yourName: Yup.string('Enter Your Name')
        .trim()
        .matches(/^[A-Za-z]+$/, 'Name Should Always Be In Letters')
        .required('Your Name  Is Required'),
      yourCompany: Yup.string('Enter Your Company Name').trim(),
      // .required('Company Name Is Required'),
      yourAddress: Yup.string('Enter Your Address').trim(),
      yourCity: Yup.string('Enter Your City Name').trim(),
      yourBank: Yup.string('Enter Your Bank Name').trim(),
      yourBankBranch: Yup.string('Enter Your Bank Branch').trim(),
      yourAccountNumber: Yup.string('Enter Your Account Number').trim(),
      yourWebsite: Yup.string('Enter Your Company URL')
        .trim()
        .url('Enter correct URL'),
      yourEmail: Yup.string('Enter Your Email Address')
        .trim()
        .email('Enter Valid Email')
        .required('Your Email Is Required'),
      yourPhone: Yup.number('Enter Your Phone Number').typeError(
        'Must Be a Valid Phone Number'
      ),
    }),
    invoiceDataValues: Yup.object().shape({
      invoiceNumber: Yup.number('Enter Invoice Number').typeError(
        'Must be a Number'
      ),
      // invoiceDate: Yup.date('Enter  Invoice Date'),
      invoiceDate: Yup.date().typeError('Invalid Started date'),

      dueDate: Yup.date().min(
        Yup.ref('invoiceDate'),
        'Due Date Cannot Be Before Invoice Date'
      ),
    }),
    digitalSignature: Yup.object().shape({
      sealColor: Yup.string('Enter Invoice Number'),
      signatureSize: Yup.string('Enter  Signature Size'),
      signature: Yup.string('Enter  Signature Size'),
    }),
    items: Yup.array()
      .min(1, 'At least 1 Item Should Be Added')
      .required('Add Atleast 1 Item'),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={invoice}
      onSubmit={handleFormSubmit}
      enableReinitialize={true}
      validateOnMount
    >
      {({ handleSubmit, errors }) => {
        return (
          <Form
            onSubmit={handleSubmit}
            id="form"
            noValidate
            style={{ width: '100%', height: '100%' }}
          >
            <InvoiceImage alertMessage={alertMessage} />
            <UserDetails />
            <ClientDetails />
            <InvoiceDates alertMessage={alertMessage} />
            {/* Invoice Number And Dates End */}
            <InvoiceItems alertMessage={alertMessage} />
            <InvoiceNotes />
            <InvoiceTerms />
            <DigitalSignature alertMessage={alertMessage} />
            {/* Save Button */}
            <Flex>
              <Box mt={8}>
                <Button
                  type="submit"
                  _focus={{
                    outline: 'none',
                  }}
                  // disabled={!isValid || !dirty}
                  fontWeight={600}
                  color={'white'}
                  onClick={() => showError(errors)}
                  bg={'purple.400'}
                  borderRadius={'lg'}
                  href={'#'}
                  _hover={{
                    bg: 'purple.700',
                  }}
                  rightIcon={<RiIcons.RiSaveLine />}
                >
                  Save
                </Button>
              </Box>
              <Spacer />
              <Box mt={8}>
                <Button
                  _focus={{
                    outline: 'none',
                  }}
                  fontWeight={600}
                  color={'black'}
                  bg={'white'}
                  borderRadius={'lg'}
                  href={'#'}
                  _hover={{
                    bg: 'whiteAlpha.800',
                  }}
                  type="reset"
                  onClick={clearAllData}
                  variant="outline"
                  rightIcon={<RiIcons.RiDeleteBin2Line />}
                >
                  Clear All
                </Button>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(EditorForm);
