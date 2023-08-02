import { Fragment, useEffect, useState } from 'react';
import { ImagesUploading } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import {
  fetchUserAvatars,
  saveAvatar,
  uploadProfileImage,
} from 'redux/actions/settings_actions';
import styled from 'styled-components';
import { AvatarT, Image, Upload } from 'assets/icons';
import { ImageType } from 'react-images-uploading';

const UpdateProfileImage = () => {
  const { picture } = useAppSelector(({ user }) => user.data);
  const { avatars } = useAppSelector(({ settings }) => settings);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<ImageType>({ data_url: '' });
  useEffect(() => {
    dispatch(fetchUserAvatars());
  }, [dispatch]);

  return (
    <StyledImage
      image={
        image.data_url
          ? image.data_url
          : picture
          ? import.meta.env.VITE_BASE_URL + '/' + picture
          : undefined
      }
    >
      <h3>{translation('profile') + ' Information'}</h3>
      <h4>{translation('set_1_paragraph')}</h4>{' '}
      <div className="flex">
        <div>
          <div className="img">
            <Image />
          </div>
          <ImagesUploading
            num={1}
            onChange={(e) => {
              setImage(e[0]);
              if (e[0].file) {
                const formData = new FormData();
                formData.append('picture', e[0].file);
                dispatch(uploadProfileImage(formData));
              }
            }}
          >
            <div>
              <Upload />
              <span>Upload profile picture</span>
            </div>

            <span>The minimum size is 600x600px.</span>
          </ImagesUploading>
        </div>
        {avatars ? (
          <div className="avatars">
            <h2>AVATARS</h2>
            <div>
              {avatars.map((elem) => (
                <Fragment key={elem}>
                  {elem ? (
                    <img
                      alt="as"
                      src={import.meta.env.VITE_BASE_URL + '/' + elem}
                      width="64px"
                      height="64px"
                      onClick={() => dispatch(saveAvatar({ path: elem }))}
                    />
                  ) : (
                    <AvatarT />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </StyledImage>
  );
};

const StyledImage = styled.div<{ image?: string }>`
  margin-bottom: 40px;
  .img {
    background-image: url(${({ image }) => (image ? image : '')});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${({ theme }) => theme.dark_input};
    border-radius: 50%;
    width: 120px;
    height: 120px;
    display: grid;
    place-items: center;
    > svg {
      display: ${({ image }) => (image ? 'none' : 'block')};
      path {
        fill: ${({ theme }) => theme.light_gray};
      }
    }
  }
  .flex {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .upload {
    color: ${({ theme }) => theme.font_gray};
    cursor: pointer;
    width: fit-content;
    overflow: hidden;
    > div {
      display: flex;
      align-items: center;
      margin: 16px 0 8px;
      > svg {
        margin-right: 16px;
        > path {
          fill: ${({ theme }) => theme.font_gray};
        }
      }
    }

    span {
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 150%;
    }
  }
  .avatars {
    height: 100%;
    border: 1px solid ${({ theme }) => theme.dark_input};
    padding: 1.6vmin;

    h2 {
      margin-top: 0;
    }
    > div {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
    }
    img {
      border-radius: 1500px;
      object-fit: cover;
      cursor: pointer;
    }
  }
  @media (max-width: 500px) {
    .flex {
      .img {
        width: 80px;
        height: 80px;
      }
      .avatars {
        > h2 {
          margin-bottom: 7px;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  @media (max-width: 400px) {
    .flex {
      grid-template-columns: auto;
      .img {
      }
      .avatars {
        height: 150px;
        margin-top: 25px;
      }
    }
  }
`;

export default UpdateProfileImage;
