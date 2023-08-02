import { FC, ReactNode } from 'react';
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';
import { CSSObject } from 'styled-components';
interface Props {
  children?: ReactNode;
  onChange: (
    value: ImageType[],
    addUpdatedIndex?: number[] | undefined
  ) => void;
  num: number;
  value?: ImageListType;
  style?: CSSObject;
  className?: string;
}

const ImagesUploading: FC<Props> = ({
  children,
  onChange,
  num,
  value,
  style,
  className = 'upload',
}) => {
  return (
    <ImageUploading
      maxNumber={num}
      acceptType={['jpg', 'svg', 'png']}
      dataURLKey="data_url"
      onChange={onChange}
      inputProps={{
        type: 'file',
      }}
      value={value ? value : []}
    >
      {({ onImageUpload, dragProps }) => (
        <div
          onClick={onImageUpload}
          {...dragProps}
          className={className}
          style={style}
        >
          <>{children}</>
        </div>
      )}
    </ImageUploading>
  );
};

export default ImagesUploading;
