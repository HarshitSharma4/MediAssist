import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    withSafeArea?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    style,
    withSafeArea = true
}) => {
    const theme = useTheme();
    const Container = withSafeArea ? SafeAreaView : View;

    return (
        <Container
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
                style
            ]}
        >
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ScreenWrapper;
