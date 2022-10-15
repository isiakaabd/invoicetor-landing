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
  // const { handleSubmit, values } = useFormikContext();
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
          handleFormSubmit();
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
      clientName: Yup.string('Enter Your First Name')
        .trim()
        .required('Client Name  Is Required'),
      clientCompany: Yup.string('Enter Your Client Company Name').trim(),
      clientAddress: Yup.string('Enter Your client Address Name').trim(),
      clientCity: Yup.string('Enter Your Client City Name').trim(),
      clientWebsite: Yup.string('Enter Your Client Comapny URL').trim(),
      // .url('Enter Correct Client URL'),
      // .required('Client Website URL Is Required'),
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
        .required('Name  Is Required'),
      yourCompany: Yup.string('Enter Your Company Name')
        .trim()
        .required('Company Name Is Required'),
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
        .email('Enter Valid Email'),
      yourPhone: Yup.number('Enter Your Phone Number').typeError(
        'Must Be a Valid Phone Number'
      ),
    }),
    invoiceDataValues: Yup.object().shape({
      invoiceNumber: Yup.number('Enter Invoice Number'),
      invoiceDate: Yup.date('Enter  Invoice Date'),
      dueDate: Yup.date('Enter invoice due date'),
    }),
    digitalSignature: Yup.object().shape({
      sealColor: Yup.string('Enter Invoice Number'),
      signatureSize: Yup.string('Enter  Signature Size'),
      signature: Yup.string('Enter  Signature Size'),
    }),
    items: Yup.array()
      .min(1, 'At least 1 Item Should Be Added')
      .required('Add Atleast 1 Item').required,
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
