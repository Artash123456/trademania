import { CopyContainer, Modal, CopyWarningModal } from 'components';
import { useAppSelector } from 'context';
const Copy = () => {
  const { copy_warning } = useAppSelector(({ modal }) => modal.types);
  if (copy_warning)
    return (
      <Modal open={copy_warning}>
        <CopyWarningModal />
      </Modal>
    );
  return <CopyContainer />;
};

export default Copy;
