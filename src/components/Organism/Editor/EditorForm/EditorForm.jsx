import { useContext, useEffect } from 'react';
import { Form, Formik } from 'formik';
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

export default function EditorForm() {
  const toast = useToast();
  const statuses = ['success', 'error', 'warning', 'info'];
  // const { handleSubmit } = useFormikContext();
  // aleart message
  const alertMessage = (message, status) => {
    toast({
      status: statuses.includes(status) ? status : 'info',
      title: message,
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  // getting the context from the provider
  const { invoice, setInvoice } = useContext(InvoiceContext);
  // const formik = useFormik({
  //   initialValues: { invoice },
  //   // onSubmit: values => {
  //   //   setInvoice(values.invoice);
  //   //   localStorage.setItem('invoicetor', JSON.stringify(values.invoice));
  //   //   alertMessage('Invoice saved successfully', 'success');
  //   // },
  // });
  // alert(JSON.stringify(invoice.clientDetails.clientEmail));
  const handleFormSubmit = values => {
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
    setInvoice(data);
    localStorage.setItem('invoicetor', JSON.stringify(data));
    alertMessage('Invoice saved successfully', 'success');
  };

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
  }, [invoice]);

  // Upload Image in localstorage ends

  // Clear All Data
  const clearAllData = () => {
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
  };

  const validationSchema = Yup.object({
    clientDetails: Yup.object().shape({
      clientName: Yup.string('Enter your First name')
        .trim()
        .required('client Name  is required'),
      clientCompany: Yup.string('Enter client Company name')
        .trim()
        .required('client Company is required'),
      clientAddress: Yup.string('Enter client Address name')
        .trim()
        .required('client Address is required'),

      clientCity: Yup.string('Enter your City name')
        .trim()
        .required('City Name is required'),
      clientWebsite: Yup.string('Enter your Comapny URL')
        .trim()
        .url('Enter correct URL')
        .required('client Website URL is required'),
      clientEmail: Yup.string('Enter client Email Address')
        .trim()
        .email('Enter Valid email')
        .required('client Email is required'),
      clientPhone: Yup.number('Enter client Phone Number')
        .typeError('Must be a valid phone number')
        .required('client Phone Number is required'),
    }),
    yourDetails: Yup.object().shape({
      yourName: Yup.string('Enter your Name')
        .trim()
        .required('Name  is required'),
      yourCompany: Yup.string('Enter your Company name')
        .trim()
        .required(' Company name is required'),
      yourAddress: Yup.string('Enter your Address')
        .trim()
        .required('Address is required'),

      yourCity: Yup.string('Enter your City name')
        .trim()
        .required('City Name is required'),
      yourBank: Yup.string('Enter your Bank name')
        .trim()
        .required('Bank Name is required'),
      yourBankBranch: Yup.string('Enter your Bank branch')
        .trim()
        .required('Bank branch is required'),
      yourAccountNumber: Yup.string('Enter your Account Number')
        .trim()
        .required('Account number is required'),
      yourWebsite: Yup.string('Enter your Company URL')
        .trim()
        .url('Enter correct URL')
        .required('Website URL is required'),
      yourEmail: Yup.string('Enter your Email Address')
        .trim()
        .email('Enter Valid email')
        .required('Email is required'),
      yourPhone: Yup.number('Enter your Phone Number')
        .typeError('Must be a valid phone number')
        .required(' Phone Number is required'),
    }),
    invoiceDataValues: Yup.object().shape({
      invoiceNumber: Yup.number('Enter invoice number').required(
        'Invoice number  is required'
      ),
      invoiceDate: Yup.date('Enter  invoice date').required(
        ' Invoice date is required'
      ),
      dueDate: Yup.date('Enter invoice due date').required('Date is required'),
    }),
    digitalSignature: Yup.object().shape({
      sealColor: Yup.string('Enter invoice number'),
      signatureSize: Yup.string('Enter  signature size'),
      signature: Yup.string('Enter  signature size').required(
        'signature is required'
      ),
    }),
    items: Yup.array().min(1, 'at least 1 items').required('required'),
  });

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        initialValues={invoice}
        enableReinitialize={true}
      >
        {({ handleSubmit, dirty, values, isValid }) => {
          console.log(values);
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
              <InvoiceDates />
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
                    disabled={!isValid || !dirty}
                    fontWeight={600}
                    color={'white'}
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
    </>
  );
}
