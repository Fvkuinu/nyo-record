'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useToast } from '@chakra-ui/react';
import Button from '@/app/ui/Button'; // ボタンコンポーネントをインポート
import InputField from '@/app/ui/InputField'; // 入力フィールドコンポーネントをインポート
import Form from '@/app/ui/Form'; // フォームコンポーネントをインポート

const ContactUs = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        from_name: '',
        to_name: 'Support Team', // 受け取る側の名前は固定
        message: '',
        reply_to: '', // ユーザーのメールアドレスを格納
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // 送信ボタンを制御するためのステート

    // 入力値が変更された際にフォームデータを更新する関数
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // メールアドレスの形式確認用正規表現
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // フォームのバリデーション
    const validateForm = () => {
        if (!formData.from_name || !formData.reply_to || !formData.message) {
            toast({
                title: 'Error',
                description: 'All fields are required.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return false;
        }

        if (!validateEmail(formData.reply_to)) {
            toast({
                title: 'Invalid Email',
                description: 'Please enter a valid email address.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return false;
        }

        return true;
    };

    // フォーム送信ハンドラー
    const handleSubmit = async (e) => {
        e.preventDefault();

        // フォームバリデーション
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await emailjs.send(
                'next-nyo-app', // EmailJSのサービスID
                'next-nyo-app-template', // EmailJSのテンプレートID
                formData,
                'q9yAlfWRKv4QODG1b' // EmailJSのユーザーID
            );

            // 送信成功のトースト表示
            toast({
                title: 'Message Sent!',
                description: 'Your message has been sent successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // フォームをリセット
            setFormData({
                from_name: '',
                to_name: 'Support Team',
                message: '',
                reply_to: '',
            });
        } catch (error) {
            // 送信失敗のトースト表示
            toast({
                title: 'Error',
                description: 'Failed to send message. Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false); // 送信ボタンの無効化を解除
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

            {/* フォームコンポーネント */}
            <Form onSubmit={handleSubmit}>
                <InputField
                    label="Your Name"
                    type="text"
                    value={formData.from_name}
                    onChange={handleChange}
                    name="from_name" // name属性を指定
                />
                <InputField
                    label="Your Email"
                    type="email"
                    value={formData.reply_to}
                    onChange={handleChange}
                    name="reply_to" // name属性を指定
                />
                <InputField
                    label="Message"
                    type="text"
                    value={formData.message}
                    onChange={handleChange}
                    name="message" // name属性を指定
                />

                {/* 送信ボタン */}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </Form>
        </div>
    );
};

export default ContactUs;
