'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react'; // Toast import
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import Input from '@/app/ui/InputField';
import Button from '@/app/ui/Button';
import ModalSpinner from '@/app/ui/ModalSpinner';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthing, setIsAuthing] = useState(false);
  const router = useRouter();
  const toast = useToast(); // Initialize toast
  // Firebase authentication function
  const authenticationUser = async (email, password) => {
    const auth = getAuth();  // Initialize Firebase Auth

    setIsAuthing(true);  // Set loading state

    try {
      // Set session persistence
      await setPersistence(auth, browserLocalPersistence);
      // Authenticate with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      router.push('/dashboard');  // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'ログインに失敗しました',
        description: `ログインに失敗しました: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      setIsAuthing(false);  // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-md w-full space-y-8">
        {/* Email input field */}
        <Input
          name="email"
          type="email"
          label="メールアドレス"
          placeholder="メールアドレスを入力"
          onChange={(e) => setEmail(e.target.value)}
          className="dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"  // Dark mode styles
        />
        
        {/* Password input field */}
        <Input
          name="password"
          type="password"
          label="パスワード"
          placeholder="パスワードを入力"
          onChange={(e) => setPassword(e.target.value)}
          className="dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"  // Dark mode styles
        />
        
        {/* Login button */}
        <Button
          onClick={async () => {
            await authenticationUser(email, password);  // Call authentication function on button click
          }}
          disabled={isAuthing}  // Disable button while authenticating
          className="dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {isAuthing ? 'ログイン中...' : 'ログイン'}
        </Button>
      </div>
      
      {/* Loading spinner during authentication */}
      <ModalSpinner isLoading={isAuthing} />
    </div>
  );
}
