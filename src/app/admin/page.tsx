import { getCurrentUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import AdminUserList from "./AdminUserList";
import BookAdminPanel from './BookAdminPanel';

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect('/');
  }

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      <AdminUserList />
      <BookAdminPanel /> {}
    </div>
  );
}
