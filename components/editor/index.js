import {
  Button, SimpleGrid, Stack, Box, FormControl, FormLabel, FormHelperText, Input,
  Link,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import create from 'zustand';
import ImportMagnetModal from './ImportMagnetModal';
import ImportTorrentFileModal from './ImportTorrentFileModal';
import AutosizeTextarea from '@/components/autosize-textarea';
import Export from './Export';

const initialState = {
  infoHash: '',
  name: '',
  announce: [],
  xl: '',
  edited: false,
};

const useStore = create((set) => ({
  ...initialState,
  clear: () => set(initialState),
  replace: (value) => set({ ...initialState, ...value, edited: true }),
  changeField: (e) => {
    const { name, value } = e.target;
    set({ [name]: value, edited: true });
  },
  changeName: (e) => {
    const { value } = e.target;
    set({ name: value.replace(/(\r\n|\n|\r)/gm, '').replace(/\s{2,}/g, ' '), edited: true });
  },
  removeAnnounce: (index) => {
    const { announce } = set();
    announce.splice(index, 1);
    set({ announce, edited: true });
  },
  addAnnounce: (link) => {
    const { announce } = set();
    announce.push(link);
    set({ announce, edited: true });
  },
}));

export default function Editor() {
  const replace = useStore((state) => state.replace);
  const changeField = useStore((state) => state.changeField);
  const edited = useStore((state) => state.edited);
  const infoHash = useStore((state) => state.infoHash);
  const name = useStore((state) => state.name);
  const changeName = useStore((state) => state.changeName);
  const announce = useStore((state) => state.announce);
  const xl = useStore((state) => state.xl);
  const torrentObject = {
    infoHash, name, announce, xl,
  };

  return (
    <>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={1}>
        <ImportMagnetModal replaceEditorState={replace} />
        <ImportTorrentFileModal replaceEditorState={replace} />
        <Button
          leftIcon={<FaRegTrashAlt />}
          colorScheme="red"
          variant="outline"
          onClick={useStore((state) => state.clear)}
          disabled={!edited}
        >
          Reset
        </Button>
      </Stack>
      <SimpleGrid columns={{ sm: 1, md: 2 }} mt={5} spacing={5}>
        <Box>
          <FormControl id="infoHash" isRequired>
            <FormLabel>
              Info Hash
            </FormLabel>
            <Input name="infoHash" value={infoHash} maxLength={40} onChange={changeField} />
            <FormHelperText>
              Unique hash of a torrent, learn more
              {' '}
              <Link isExternal textDecoration="underline" href="https://stackoverflow.com/a/28601408/5257518">here</Link>
            </FormHelperText>
          </FormControl>
          <FormControl id="name" mt={5}>
            <FormLabel>
              Name
            </FormLabel>
            <AutosizeTextarea name="name" value={name} onChange={changeName} />
            <FormHelperText>
              It will appear in the torrent client
            </FormHelperText>
          </FormControl>
          <FormControl id="xl" mt={5}>
            <FormLabel>
              Size (in bytes)
            </FormLabel>
            <Input name="xl" value={xl} onChange={changeField} />
            <FormHelperText>
              Allows to show size in the torrent client before data is aquired from the peers
            </FormHelperText>
          </FormControl>
          <FormControl id="xl" mt={5}>
            <FormLabel>
              Trackers
            </FormLabel>
            <FormHelperText>
              List of the trackers which will be used to find peers
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <Export torrentObject={torrentObject} />
        </Box>
      </SimpleGrid>
    </>
  );
}
