import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Animated, Easing, Keyboard } from 'react-native';
import { Text, TextInput, IconButton, Surface, useTheme, Avatar, ProgressBar } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import { chatApi } from '../../services/api';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    isAudio?: boolean;
    audioUri?: string;
    duration?: string;
}

const AudioMessage = ({ uri }: { uri: string }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            const successStatus = status as AVPlaybackStatusSuccess;
            setPosition(successStatus.positionMillis);
            setDuration(successStatus.durationMillis || 0);
            if (successStatus.didJustFinish) {
                setIsPlaying(false);
                setPosition(0);
            }
        }
    };

    async function playSound() {
        try {
            if (sound) {
                if (isPlaying) {
                    await sound.pauseAsync();
                    setIsPlaying(false);
                } else {
                    await sound.playAsync();
                    setIsPlaying(true);
                }
            } else {
                console.log('Loading Sound');
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri },
                    { shouldPlay: true }
                );
                newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
                setSound(newSound);
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Playback error:', error);
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const progress = duration > 0 ? position / duration : 0;

    return (
        <View style={styles.audioBubbleContent}>
            <TouchableOpacity onPress={playSound}>
                <Icon name={isPlaying ? "pause" : "play"} size={26} color="white" />
            </TouchableOpacity>
            <ProgressBar progress={progress} color="white" style={styles.audioProgress} />
        </View>
    );
};

const ChatScreen = () => {
    const theme = useTheme();
    const route = useRoute();
    const { context } = (route.params as any) || {};

    const [text, setText] = useState('');
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm MediAssist AI. I've analyzed your health profile. How can I assist you with your recovery or reports today?",
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [mode, setMode] = useState<'general' | 'report'>('general');
    const [isRecording, setIsRecording] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [isAiTyping, setIsAiTyping] = useState(false);

    const recordingRef = useRef<Audio.Recording | null>(null);

    const waveAnims = useRef([
        new Animated.Value(10),
        new Animated.Value(10),
        new Animated.Value(10),
        new Animated.Value(10),
        new Animated.Value(10)
    ]).current;

    const flatListRef = useRef<FlatList>(null);
    const filterInterval = useRef<any>(null);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showListener = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
        const hideListener = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (context) {
            setMode('report');
            const userMsg: Message = {
                id: Date.now().toString(),
                text: `Analyzing context: "${context}"`,
                sender: 'user',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, userMsg]);
            // Ask the real AI about this context
            callAI(`Analyze this medical report context: ${context}`);
        }
    }, [context]);

    // Wave Animation
    useEffect(() => {
        if (isRecording) {
            const createWave = (anim: Animated.Value) => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(anim, { toValue: Math.random() * 40 + 10, duration: 200, useNativeDriver: false, easing: Easing.linear }),
                        Animated.timing(anim, { toValue: 10, duration: 200, useNativeDriver: false, easing: Easing.linear }),
                    ])
                ).start();
            };
            waveAnims.forEach(anim => createWave(anim));

            filterInterval.current = setInterval(() => {
                setRecordTime(prev => prev + 1);
            }, 1000);
        } else {
            waveAnims.forEach(anim => anim.setValue(10));
            if (filterInterval.current) {
                clearInterval(filterInterval.current);
                filterInterval.current = null;
            }
            setRecordTime(0);
        }
    }, [isRecording]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const callAI = async (prompt: string) => {
        setIsAiTyping(true);
        try {
            const result = await chatApi.ask(prompt, sessionId);
            if (!sessionId) setSessionId(result.session_id);
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: result.reply,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
        } catch (e: any) {
            const errMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: `Sorry, I couldn't connect to the AI service. Please check your internet and try again.`,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errMsg]);
        } finally {
            setIsAiTyping(false);
        }
    };

    const sendMessage = async () => {
        if (!text.trim()) return;
        const userText = text;
        const newMessage: Message = {
            id: Date.now().toString(),
            text: userText,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
        setText('');
        await callAI(userText);
    };

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === 'granted') {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                const { recording: newRecording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                recordingRef.current = newRecording;
                setIsRecording(true);
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopAndSendRecording = async () => {
        if (!recordingRef.current) return;

        try {
            setIsRecording(false);
            await recordingRef.current.stopAndUnloadAsync();
            const uri = recordingRef.current.getURI();
            recordingRef.current = null;

            setIsSending(true);

            setTimeout(() => {
                setIsSending(false);
                const audioMsg: Message = {
                    id: Date.now().toString(),
                    text: "Sent audio message",
                    sender: 'user',
                    timestamp: new Date(),
                    isAudio: true,
                    audioUri: uri || undefined,
                    duration: formatTime(recordTime)
                };
                setMessages(prev => [...prev, audioMsg]);
                simulateAIResponse(true);
            }, 1000);
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageRow, isUser ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
                {!isUser && (
                    <Avatar.Icon size={32} icon="robot" style={styles.aiAvatar} color="white" />
                )}
                <Surface style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.aiBubble,
                    { backgroundColor: isUser ? theme.colors.primary : 'white' }
                ]} elevation={1}>
                    {item.isAudio && item.audioUri ? (
                        <AudioMessage uri={item.audioUri} />
                    ) : (
                        <Text style={[styles.messageText, { color: isUser ? 'white' : theme.colors.onSurface }]}>
                            {item.text}
                        </Text>
                    )}
                    <Text style={[styles.timeText, { color: isUser ? 'rgba(255,255,255,0.7)' : theme.colors.outline }]}>
                        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {item.isAudio && ` • ${item.duration}`}
                    </Text>
                </Surface>
            </View>
        );
    };

    return (
        <ScreenWrapper style={styles.container} withSafeArea={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
            >
                <Surface style={styles.header} elevation={2}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text variant="titleLarge" style={styles.headerTitle}>MediAssist AI</Text>
                            <View style={styles.statusRow}>
                                <View style={styles.onlineDot} />
                                <Text variant="labelSmall" style={styles.statusText}>Active Analysis</Text>
                            </View>
                        </View>
                        <IconButton icon="dots-vertical" onPress={() => { }} />
                    </View>
                </Surface>

                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.chatList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                <Surface style={[styles.inputContainer, keyboardVisible ? styles.inputKeyboardVisible : styles.inputTabVisible]} elevation={4}>
                    {isRecording ? (
                        <View style={styles.recordingInterface}>
                            <View style={styles.waveContainer}>
                                {waveAnims.map((anim, i) => (
                                    <Animated.View key={i} style={[styles.waveBar, { height: anim, backgroundColor: theme.colors.error }]} />
                                ))}
                            </View>
                            <Text style={styles.timerText}>{formatTime(recordTime)}</Text>
                            <TouchableOpacity style={styles.stopBtn} onPress={stopAndSendRecording}>
                                <Icon name="stop" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : isSending ? (
                        <View style={styles.sendingInterface}>
                            <Icon name="cloud-upload" size={24} color={theme.colors.primary} />
                            <Text style={styles.sendingText}>Processing Audio...</Text>
                        </View>
                    ) : (
                        <View style={styles.inputBar}>
                            <TouchableOpacity style={styles.micBtn} onPress={startRecording}>
                                <Icon name="microphone" size={24} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Ask AI anything..."
                                value={text}
                                onChangeText={setText}
                                style={styles.input}
                                mode="flat"
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                placeholderTextColor="#999"
                            />
                            <IconButton
                                icon="send"
                                mode="contained"
                                containerColor={theme.colors.primary}
                                iconColor="white"
                                onPress={sendMessage}
                                disabled={!text.trim()}
                                style={styles.sendBtn}
                            />
                        </View>
                    )}
                </Surface>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontWeight: '800',
        color: '#1A1A1A',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
    },
    statusText: {
        color: '#666',
        fontWeight: '600',
    },
    chatList: {
        padding: 20,
        paddingBottom: 20,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-end',
        gap: 10,
    },
    aiAvatar: {
        backgroundColor: '#00695C',
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 22,
    },
    userBubble: {
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    timeText: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    audioBubbleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        gap: 12,
        paddingVertical: 5,
    },
    audioProgress: {
        flex: 1,
        height: 6,
        borderRadius: 3,
    },
    inputContainer: {
        margin: 15,
        borderRadius: 30,
        backgroundColor: 'white',
        minHeight: 65,
        justifyContent: 'center',
    },
    inputTabVisible: {
        marginBottom: 100,
    },
    inputKeyboardVisible: {
        marginBottom: 15,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    micBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#00695C',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 15,
        height: 50,
    },
    sendBtn: {
        margin: 0,
    },
    recordingInterface: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 15,
    },
    waveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        width: 80,
    },
    waveBar: {
        width: 4,
        borderRadius: 2,
    },
    timerText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    stopBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#D32F2F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendingInterface: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    sendingText: {
        fontWeight: '600',
        color: '#00695C',
    }
});

export default ChatScreen;
