'use client';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const script = document.createElement('script');
        // Dùng version mới nhất từ documentation
        script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js';

        script.onload = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).CozeWebSDK) {
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
                        // Base settings - QUAN TRỌNG cho full screen
                        base: {
                            layout: 'mobile', // 'mobile' = FULL SCREEN
                            lang: 'en', // hoặc 'zh-CN'
                            zIndex: 9999,
                        },

                        // Ẩn floating button
                        asstBtn: {
                            isNeed: false, // Ẩn floating ball
                        },

                        header: {
                            isShow: true, // true = hiện title bar, false = ẩn
                            isNeedClose: false, // Hiện nút close
                        },

                        chatBot: {
                            title: 'AI Support Assistant', // Title
                            uploadable: true, // Cho phép upload file
                            isNeedAddNewConversation: true, // Nút tạo conversation mới
                            // Callbacks
                            onShow: () => {
                                console.log('Chat opened');
                            },
                            onHide: () => {
                                console.log('Chat closed');
                            },
                        },

                        // Footer text (optional)
                        footer: {
                            isShow: false, // Ẩn "Powered by Coze"
                        },
                    },
                });

                // AUTO OPEN - Tự động mở chat sau khi load
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
        <div className="fixed inset-0 bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
    );
}