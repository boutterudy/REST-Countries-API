import { redirect } from 'next/navigation';

function NotFoundPage() {
  return redirect('/');
}

export default NotFoundPage;
