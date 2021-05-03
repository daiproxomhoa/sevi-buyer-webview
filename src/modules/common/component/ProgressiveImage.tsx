import * as React from 'react';
import RPI from '../lib/ReactProgressiveImage';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { LIGHT_GREY } from '../../../configs/colors';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeInImg = styled.img`
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
  animation-timing-function: linear;
`;

interface IProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ProgressiveImage: React.FunctionComponent<IProgressiveImageProps> = (props) => {
  return (
    <RPI src={props.src || ''} placeholder={props.src || ''}>
      {(src: string, loading: boolean) =>
        loading ? (
          <span
            style={{
              ...props.style,
              display: 'inline-block',
              backgroundColor: LIGHT_GREY,
            }}
          />
        ) : (
          <FadeInImg
            {...props}
            alt={props.alt || ''}
            style={{
              ...props.style,
            }}
          />
        )
      }
    </RPI>
  );
};

export default ProgressiveImage;
