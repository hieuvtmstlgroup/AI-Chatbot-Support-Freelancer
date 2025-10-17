'use client';
import { useEffect, useRef } from 'react';

export default function Home() {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js';

        script.onload = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).CozeWebSDK && chatContainerRef.current) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const cozeWebSDK = new (window as any).CozeWebSDK.WebChatClient({
                    config: {
                        botId: process.env.NEXT_PUBLIC_COZE_BOT_ID,
                        isIframe: false,
                    },

                    auth: {
                        type: 'token',
                        token: process.env.NEXT_PUBLIC_COZE_TOKEN,
                        onRefreshToken: () => process.env.NEXT_PUBLIC_COZE_TOKEN
                    },

                    ui: {
                        base: {
                            icon: '/favicon.ico',
                            layout: 'pc',
                            lang: 'en',
                            zIndex: 9999,
                        },

                        asstBtn: {
                            isNeed: false,
                        },

                        header: {
                            isShow: true,
                            isNeedClose: false,
                        },

                        chatBot: {
                            title: 'Tìm Việc Việt Nam',
                            uploadable: true,
                            isNeedAddNewConversation: true,
                            el: chatContainerRef.current, // Mount vào container
                            onShow: () => {
                                console.log('Chat opened');
                            },
                            onHide: () => {
                                console.log('Chat closed');
                            },
                        },

                        footer: {
                            isShow: false,
                        },
                    },
                });

                // Auto show
                setTimeout(() => {
                    cozeWebSDK.showChatBot();
                }, 100);
            }
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: '#d1fa94' }}
        >
            <div
                ref={chatContainerRef}
                className="w-full max-w-md h-[80vh] rounded-2xl shadow-2xl overflow-hidden"
            />
        </div>

    );
}