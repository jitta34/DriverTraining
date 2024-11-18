import { Platform } from "react-native"
const productSkus = Platform.select({
    android: [
        'one2one_sub'
    ]
})
export const constants = {
    productSkus
};