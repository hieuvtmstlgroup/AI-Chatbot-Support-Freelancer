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
                            lang: 'en',
                            zIndex: 9999,
                        },
                        asstBtn: {
                            isNeed: false,
                        },
                        header: {
                            isShow: false,
                            isNeedClose: false,
                        },
                        chatBot: {
                            title: 'Tìm Việc Việt Nam',
                            uploadable: true,
                            isNeedAddNewConversation: true,
                            el: chatContainerRef.current,
                        },
                        footer: {
                            isShow: false,
                        },
                    },
                });

                setTimeout(() => {
                    cozeWebSDK.showChatBot();
                }, 0);
            }
        };

        document.body.appendChild(script);
    }, []);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center md:p-4"
            style={{ backgroundColor: '#d1fa94', overflow: 'hidden' }}
        >
            <div
                ref={chatContainerRef}
                className="w-full h-full md:max-w-md md:h-[80vh] md:rounded-2xl md:shadow-2xl bg-white"
            />
        </div>
    );
}