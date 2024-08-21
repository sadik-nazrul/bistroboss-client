import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <span>Hi Welcome</span>
      {user?.displayName ? user?.displayName : " Back"}
    </div>
  );
};

export default UserHome;
