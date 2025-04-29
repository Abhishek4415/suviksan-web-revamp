declare module 'lottie-react' {
    import { FC } from 'react';
  
    interface LottieProps {
      animationData: object;
      loop?: boolean;
      autoplay?: boolean;
      className?: string;
      style?: React.CSSProperties;
      onComplete?: () => void;
      onLoopComplete?: () => void;
      onEnterFrame?: () => void;
      onSegmentStart?: () => void;
    }
  
    const Lottie: FC<LottieProps>;
    export default Lottie;
  }
  