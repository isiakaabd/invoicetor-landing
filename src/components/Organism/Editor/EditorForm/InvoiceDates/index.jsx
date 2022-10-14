import 'components/Organism/Editor/Editor.scss';
import { Box, Stack, useToast } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import FormikControl from 'components/Pages/Form/FormikControl';
import { useEffect } from 'react';

export default function InvoiceDates() {
  const {
    setFieldValue,
    values: { invoiceDataValues },
  } = useFormikContext();

  const toast = useToast();

  const handleDateChange = e => {
    if (invoiceDataValues?.invoiceDate !== '') {
      setFieldValue('invoiceDataValues.dueDate', e.target.value);
    } else {
      toast({
        status: 'error',
        title: 'Select an invoice Date',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  useEffect(() => {
    const { invoiceDate, dueDate } = invoiceDataValues;
    if (invoiceDate > dueDate || !invoiceDate) {
      setFieldValue('invoiceDataValues.dueDate', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceDataValues?.invoiceDate, invoiceDataValues?.dueDate]);

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
          onChange={handleDateChange}
          min={invoiceDataValues.invoiceDate}
          value={invoiceDataValues.invoiceDate ? invoiceDataValues.dueDate : ''}
        />
      </Box>
    </Stack>
  );
}
