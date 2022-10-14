import 'components/Organism/Editor/Editor.scss';
import { useState } from 'react';
import { useFormikContext } from 'formik';
import {
  Box,
  Image,
  Stack,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export default function InvoiceImage({ alertMessage }) {
  const [sliderValue, setSliderValue] = useState('150');
  const [isOpenPop, setIsOpenPop] = useState(false);
  const open = () => setIsOpenPop(!isOpenPop);
  const close = () => setIsOpenPop(false);

  const {
    setFieldValue,
    values: { yourLogo },
  } = useFormikContext();
  // // aleart message

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Upload Image in localstorage starts
  const imageUpload = e => {
    let file = e.target.files[0];
    getBase64(file).then(base64 => {
      setFieldValue('yourLogo.image', base64);
      setFieldValue('yourLogo.imageSize', sliderValue);
    });
    alertMessage('Image uploaded successfully', 'success');
  };

  // change Image Size using slider
  const changeImageSize = value => {
    setSliderValue(value);
    setFieldValue('yourLogo.imageSize', value);
  };

  return (
    <>
      <Stack spacing={4}>
        <Box>
          <Popover isOpen={isOpenPop} onClose={close} placement="top-start">
            <PopoverTrigger>
              {yourLogo?.image ? (
                <Flex>
                  <Image
                    src={yourLogo.image}
                    alt="company logo"
                    className="company-logo"
                    name="yourLogo.image"
                    style={{
                      borderRadius: '10px',
                      marginBottom: '10px',
                    }}
                    w={yourLogo?.imageSize}
                    h={yourLogo?.imageSize}
                    onClick={() => {
                      document.getElementById('uploadFile').click();
                    }}
                  />{' '}
                  <Menu>
                    <MenuButton
                      m={2}
                      as={IconButton}
                      aria-label="Options"
                      icon={<RiIcons.RiMenu3Fill />}
                      variant="outline"
                    />

                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          document.getElementById('uploadFile').click();
                        }}
                        icon={<RiIcons.RiUpload2Fill />}
                      >
                        Upload Image
                      </MenuItem>
                      <MenuItem
                        icon={<MdIcons.MdPhotoSizeSelectLarge />}
                        onClick={open}
                      >
                        Resize Logo
                      </MenuItem>{' '}
                      <MenuItem
                        icon={<RiIcons.RiDeleteBin3Line />}
                        onClick={() => {
                          setFieldValue('yourLogo.image', '');
                          setFieldValue('yourLogo.imageSize', '150');

                          alertMessage('🗑️ Company Logo Cleared');
                        }}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <Center
                  w="200px"
                  h="200px"
                  style={{
                    borderRadius: '10px',
                    marginBottom: '10px',
                    border: '4px dotted #eaeaea',
                  }}
                  onClick={() => {
                    document.getElementById('uploadFile').click();
                  }}
                >
                  Add Logo
                </Center>
              )}
            </PopoverTrigger>
            <PopoverContent w={300}>
              <PopoverHeader fontWeight="semibold">Resize Logo</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Center>
                  <Slider
                    mb={7}
                    aria-label="slider-ex-3"
                    defaultValue={yourLogo?.imageSize}
                    orientation="horizontal"
                    colorScheme={'purple'}
                    maxW="200"
                    min={100}
                    max={250}
                    onChange={v => changeImageSize(v)}
                    _hover={{
                      cursor: 'grab',
                    }}
                  >
                    <SliderMark value={100} mt="3" ml="-2.5" fontSize="sm">
                      100px
                    </SliderMark>{' '}
                    <SliderMark value={150} mt="3" ml="-2.5" fontSize="sm">
                      150px
                    </SliderMark>{' '}
                    <SliderMark value={200} mt="3" ml="-2.5" fontSize="sm">
                      200px
                    </SliderMark>{' '}
                    <SliderMark value={250} mt="3" ml="-2.5" fontSize="sm">
                      250px
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb
                      boxSize={6}
                      _hover={{
                        cursor: 'grab',
                      }}
                    >
                      <FaIcons.FaPaperPlane color="black" fontSize={10} />
                    </SliderThumb>
                  </Slider>
                </Center>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Image Size Slider  */}

          <input
            id="uploadFile"
            type="file"
            name="image"
            className="img"
            onChange={e => imageUpload(e)}
          />
        </Box>
      </Stack>
    </>
  );
}
