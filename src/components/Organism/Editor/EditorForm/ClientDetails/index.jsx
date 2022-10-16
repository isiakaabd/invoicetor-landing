import 'components/Organism/Editor/Editor.scss';

import { Box, Stack } from '@chakra-ui/react';
import FormikControl from 'components/Pages/Form/FormikControl';
import { memo } from 'react';

const ClientDetails = () => {
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
};

export default memo(ClientDetails);
