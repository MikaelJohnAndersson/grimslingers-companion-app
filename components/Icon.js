import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import iconConfig from '../assets/iconConfig.json';
const iconAssetId = require('../assets/fonts/icons.ttf');

export default Icon = createIconSetFromIcoMoon(iconConfig, 'GrimIcons', iconAssetId);