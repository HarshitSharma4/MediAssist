import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Text, TextInput, IconButton, Surface, useTheme, Avatar, Chip } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const ChatScreen = () => {
    const theme = useTheme();
    const route = useRoute();
    const { context } = (route.params as any) || {};

    const [text, setText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm MediAssist AI. How can I help you today?",
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [mode, setMode] = useState<'general' | 'report'>('general');
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (context) {
            setMode('report');
            const contextMsg: Message = {
                id: Date.now().toString(),
                text: `I'd like to discuss the following context: "${context}"`,
                sender: 'user',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, contextMsg]);

            setTimeout(() => {
                const aiReponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "I see. I've analyzed the context you provided. What specific questions do you have about this report?",
                    sender: 'ai',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiReponse]);
            }, 1000);
        }
    }, [context]);

    const sendMessage = () => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setText('');

        // Simulate AI Response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: mode === 'general'
                    ? "I understand. Could you tell me more about your symptoms?"
                    : "Based on the report details, it seems like follow-up is recommended.",
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1000);
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.userMessage : styles.aiMessage,
                { backgroundColor: isUser ? theme.colors.primary : theme.colors.surfaceVariant }
            ]}>
                {!isUser && (
                    <Avatar.Icon size={24} icon="robot" style={{ backgroundColor: 'transparent', marginRight: 5 }} color={theme.colors.primary} />
                )}
                <Text style={{ color: isUser ? theme.colors.onPrimary : theme.colors.onSurfaceVariant }}>
                    {item.text}
                </Text>
            </View>
        );
    };

    return (
        <ScreenWrapper style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
                <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Medical Assistant</Text>
                <View style={styles.modeSelector}>
                    <TouchableOpacity onPress={() => setMode('general')}>
                        <Chip selected={mode === 'general'} showSelectedOverlay>General</Chip>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMode('report')}>
                        <Chip selected={mode === 'report'} showSelectedOverlay>Report Analysis</Chip>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat Area */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <Surface style={[styles.inputContainer, { backgroundColor: theme.colors.surface }]} elevation={2}>
                    <IconButton icon="microphone" onPress={() => { }} />
                    <TextInput
                        placeholder="Ask anything..."
                        value={text}
                        onChangeText={setText}
                        style={[styles.input, { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurface }]}
                        placeholderTextColor={theme.colors.onSurfaceVariant}
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                    />
                    <IconButton
                        icon="send"
                        mode="contained"
                        containerColor={theme.colors.primary}
                        iconColor={theme.colors.onPrimary}
                        onPress={sendMessage}
                        disabled={!text.trim()}
                    />
                </Surface>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 15,
        elevation: 4,
        zIndex: 1,
    },
    modeSelector: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    chatContent: {
        padding: 15,
        paddingBottom: 20,
    },
    messageContainer: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userMessage: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 2,
    },
    aiMessage: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 5,
        height: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default ChatScreen;
