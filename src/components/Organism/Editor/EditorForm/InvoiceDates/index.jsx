import 'components/Organism/Editor/Editor.scss';
import { Box, Stack } from '@chakra-ui/react';
import FormikControl from 'components/Pages/Form/FormikControl';
import { memo } from 'react';

const InvoiceDates = () => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={8} my="20">
      <Box>
        <FormikControl
          type="text"
          placeholder="Invoice Number"
          name="invoiceDataValues.invoiceNumber"
          onKeyDown={e =>
            ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
          }
        />
      </Box>
      <Box>
        <FormikControl
          control="date"
          type="date"
          name="invoiceDataValues.invoiceDate"
          placeholder="Invoice Date"
        />
      </Box>
      <Box>
        <FormikControl
          type="date"
          name="invoiceDataValues.dueDate"
          placeholder="Due Date"
        />
      </Box>
    </Stack>
  );
};
export default memo(InvoiceDates);
