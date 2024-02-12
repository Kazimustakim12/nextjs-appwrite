const UserProfile = ({ params }: any) => {
  return (
    <div>
      <h1>UserProfile</h1>
      <p>profile page {params.id}</p>
    </div>
  );
};

export default UserProfile;
