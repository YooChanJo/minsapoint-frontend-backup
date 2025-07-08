import { RootStackParamList } from "@/App";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";

const NavigationAPI: { useNavigationWithParamInfo: Function, useCompatibleEffect: Function } = {
    /* A Tool for resolving typescript errors */
    useNavigationWithParamInfo: () => useNavigation<NativeStackNavigationProp<RootStackParamList>>(),
    /* A useEffect tool for all platforms */
    /* eslint-disable react-hooks/exhaustive-deps */
    useCompatibleEffect: (effect: () => void | (() => void), deps: any[] = []) => useFocusEffect(useCallback(effect, deps)),
    /* eslint-enable react-hooks/exhaustive-deps */
}

export default NavigationAPI;