import 'components/Organism/Editor/Editor.scss';
import { Box, Stack } from '@chakra-ui/react';
import FormikControl from 'components/Pages/Form/FormikControl';
import { memo } from 'react';
const UserDetails = () => {
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
};
export default memo(UserDetails);
