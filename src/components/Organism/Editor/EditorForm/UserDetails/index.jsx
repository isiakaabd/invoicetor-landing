import 'components/Organism/Editor/Editor.scss';
import { Box, Stack } from '@chakra-ui/react';
import FormikControl from 'components/Pages/Form/FormikControl';

export default function UserDetails({
  yourDetails,
  getYourDetails,
  resetForm,
}) {
  // const formik = useFormik({
  //   initialValues: { yourDetails },
  // });
  // useEffect(() => {
  //   if (resetForm) {
  //     formik.resetForm();
  //   }
  // }, [resetForm, formik]);

  // useEffect(() => {
  //   getYourDetails(formik.values.yourDetails);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik.values]);

  // const validationSchema = Yup.object({
  //   yourName: Yup.string('Enter your First name')
  //     .trim()
  //     .required('First Name is required'),
  //   yourCompany: Yup.string('Enter your Company name')
  //     .trim()
  //     .required('Company is required'),
  //   yourBankBranch: Yup.string('Enter your Bank branch')
  //     .trim()
  //     .required('Bank branch is required'),
  //   yourAddress: Yup.string('Enter your Company name')
  //     .trim()
  //     .required('Company is required'),
  //   yourBank: Yup.string('Enter your Bank name')
  //     .trim()
  //     .required('Bank name is required'),
  //   yourCity: Yup.string('Enter your City name')
  //     .trim()
  //     .required('City Name is required'),
  //   yourAccountNumber: Yup.number('Enter your Account Number')
  //     .min(1)
  //     .required('Account Number is required'),
  //   yourWebsite: Yup.string('Enter your Comapny URL')
  //     .trim()
  //     .url('Enter correct URL')
  //     .required('Comapny URL is required'),
  //   yourEmail: Yup.string('Enter your Email Address')
  //     .trim()
  //     .email('Enter Valid email')
  //     .required('Email is required'),
  //   yourPhone: Yup.number('Enter your Phone Number')
  //     // .trim()
  //     .typeError('Must be a valid phone number')
  //     .required('Phone Number is required'),
  // });

  return (
    <>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8} my="5">
        <Box>
          <FormikControl name="yourDetails.yourName" placeholder="Your Name" />
        </Box>

        <Box>
          <FormikControl
            name="yourDetails.yourEmail"
            type="email"
            placeholder="Your Email"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="yourDetails.yourPhone"
            placeholder="Your Phone"
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
            size={'lg'}
            name="yourDetails.yourCompany"
            placeholder="Your Company"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            size={'lg'}
            name="yourDetails.yourAddress"
            placeholder="Your Address"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="yourDetails.yourCity"
            placeholder="Your City"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="yourDetails.yourWebsite"
            placeholder="Your Website"
          />
        </Box>
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={8} my="5">
        <Box>
          <FormikControl
            type="text"
            min={0}
            size={'lg'}
            name="yourDetails.yourAccountNumber"
            placeholder="Your Account Number"
            onKeyDown={e =>
              ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
            }
          />
        </Box>

        <Box>
          <FormikControl
            type="text"
            name="yourDetails.yourBank"
            placeholder="Your Bank"
          />
        </Box>
        <Box>
          <FormikControl
            type="text"
            name="yourDetails.yourBankBranch"
            placeholder="Your Bank Branch"
          />
        </Box>
      </Stack>
    </>
  );
}
