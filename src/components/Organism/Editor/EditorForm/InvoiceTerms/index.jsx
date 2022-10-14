import 'components/Organism/Editor/Editor.scss';
import { useFormikContext } from 'formik';
import { Box, Stack, Text, Flex, Tooltip, IconButton } from '@chakra-ui/react';
import * as BiIcons from 'react-icons/bi';
import FormikControl from 'components/Pages/Form/FormikControl';

export default function InvoiceTerms({ getTerms, resetForm }) {
  const {
    values: { terms },
    setFieldValue,
  } = useFormikContext();
  // const formik = useFormik({
  //   initialValues: { terms },
  // });
  // useEffect(() => {
  //   if (resetForm) {
  //     formik.resetForm();
  //   }
  // }, [resetForm, formik]);

  // useEffect(() => {
  //   getTerms(formik.values.terms);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik.values]);

  return (
    <>
      {/* Invocie Total Starts  */}
      <Stack my={10}>
        <Box>
          <Text mb="8px">Terms & Condition : </Text>
          <Flex>
            <FormikControl
              control="textarea"
              isDisabled={terms?.termToggle ? true : false}
              name="terms.term"
              placeholder="Please make the payment by the due date"
            />
            {
              // TOGGLE Icon button
              <Tooltip label={terms?.termToggle ? 'Show' : 'Hide'}>
                <IconButton
                  variant="outline"
                  aria-label="Options"
                  mx={2}
                  icon={
                    terms?.termToggle ? <BiIcons.BiHide /> : <BiIcons.BiShow />
                  }
                  onClick={e =>
                    setFieldValue('terms.termToggle', !terms?.termToggle)
                  }
                />
              </Tooltip>
            }
          </Flex>
        </Box>
      </Stack>
    </>
  );
}
