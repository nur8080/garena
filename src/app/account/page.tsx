import { getSession } from '@/app/actions';
import AccountDetails from './_components/account-details';
import AuthTabs from './_components/auth-tabs';

export default async function AccountPage() {
  const session = await getSession();

  return (
    <div className="container mx-auto px-6 py-16">
      {session ? <AccountDetails username={session.username} /> : <AuthTabs />}
    </div>
  );
}
