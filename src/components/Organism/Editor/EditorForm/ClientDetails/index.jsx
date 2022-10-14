import 'components/Organism/Editor/Editor.scss';

import { Box, Stack } from '@chakra-ui/react';
// import * as Yup from 'yup';
import FormikControl from 'components/Pages/Form/FormikControl';

// import { useEffect } from 'react';

export default function ClientDetails({
  clientDetails,
  getClientDetails,
  resetForm,
}) {
  // const formik = useFormik({
  //   initialValues: { clientDetails },
  // });

  // useEffect(() => {
  //   if (resetForm) {
  //     formik.resetForm();
  //   }
  // }, [resetForm, formik]);

  // useEffect(() => {
  //   getClientDetails(formik.values.clientDetails);
  //   console.log(formik.values);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik.values.clientDetails]);
  // const validationSchema = Yup.object({
  //   clientName: Yup.string('Enter your First name')
  //     .trim()
  //     .required('client Name  is required'),
  //   clientCompany: Yup.string('Enter client Company name')
  //     .trim()
  //     .required('client Company is required'),
  //   clientAddress: Yup.string('Enter client Address name')
  //     .trim()
  //     .required('client Address is required'),

  //   clientCity: Yup.string('Enter your City name')
  //     .trim()
  //     .required('City Name is required'),
  //   clientWebsite: Yup.string('Enter your Comapny URL')
  //     .trim()
  //     .url('Enter correct URL')
  //     .required('client Website URL is required'),
  //   clientEmail: Yup.string('Enter client Email Address')
  //     .trim()
  //     .email('Enter Valid email')
  //     .required('client Email is required'),
  //   clientPhone: Yup.number('Enter client Phone Number')
  //     .typeError('Must be a valid phone number')
  //     .required('client Phone Number is required'),
  // });
  // console.log(formik.values);

  return (
    <>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8} mt="20">
        <Box>
          <FormikControl
            type="text"
            placeholder="Client Name"
            name="clientDetails.clientName"
          />
        </Box>
        <Box>
          <FormikControl
            type="email"
            name="clientDetails.clientEmail"
            placeholder="Client Email"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="clientDetails.clientPhone"
            placeholder="Client Phone"
            onKeyDown={e =>
              ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
            }
          />
        </Box>
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8} my="5">
        <Box>
          <FormikControl
            type="text"
            name="clientDetails.clientCompany"
            placeholder="Client Company"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="clientDetails.clientAddress"
            placeholder="Client Address"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="clientDetails.clientCity"
            placeholder="Client City"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="clientDetails.clientWebsite"
            placeholder="Client Website"
          />
        </Box>
      </Stack>
    </>
  );
}
