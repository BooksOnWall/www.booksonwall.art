import { useMediaQuery, MediaQuery } from 'react-responsive'

const useReactive = () => {
  return {
    isDesktop: useMediaQuery({ minWidth: 992 }),
    isBigScreen : useMediaQuery({ minWidth: 1824 }),
    isTablet : useMediaQuery({ minWidth: 768, maxWidth: 991 }),
    isMobile: useMediaQuery({maxWidth: 767}),
    isPortrait : useMediaQuery({ orientation: 'portrait' }),
    isLandscape: useMediaQuery({orientation: 'landscape'}),
    isRetina : useMediaQuery({ minResolution: '2dppx', maxWidth: 3800 }),
    isLarge: useMediaQuery({minWidth: 992, maxWidth: 1280}),
    isMedium: useMediaQuery({minWidth: 768, maxWidth: 991}),
    isSmall: useMediaQuery({minWidth: 350, maxWidth: 767}),
    isTiny: useMediaQuery({minWidth: 1, maxWidth: 349}),
    is4k : useMediaQuery({ minResolution: '3dppx' }),
  }
}

export {useReactive , MediaQuery}
