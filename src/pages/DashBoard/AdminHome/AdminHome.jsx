import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <span>Hi Welcome </span>
      {user?.displayName ? user?.displayName : "Back"}
    </div>
  );
};

export default AdminHome;
