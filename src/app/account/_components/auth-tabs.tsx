'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateAccountForm from './create-account-form';
import LoginForm from './login-form';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthTabs() {
  return (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="create-account">Create Account</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your Garena Gears account.</CardDescription>
                </CardHeader>
                <LoginForm />
            </Card>
        </TabsContent>
        <TabsContent value="create-account">
            <Card>
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Join Garena Gears to get started.</CardDescription>
                </CardHeader>
                <CreateAccountForm />
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}