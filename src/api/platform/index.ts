import { Platform } from 'react-native';

/* All platform specific api app operations go here */
const PlatformAPI: { getCurrentPlatform: Function } = {
    getCurrentPlatform: () => Platform.OS,

};

export default PlatformAPI;
