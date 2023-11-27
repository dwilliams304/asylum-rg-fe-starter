import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {
  //When testing this for styling/anything else, just comment our the redir.push

  const { user, isAuthenticated, isLoading } = useAuth0();

  const redir = useHistory();
  if (!isAuthenticated) redir.push('/');

  if (isLoading) return <div>Loading information...</div>;
  return (
    <div className="profile-page">
      <h2>Hello, {user.given_name}</h2>
      <img src={user.picture} alt={user.name} />
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>

      <div className="profile-details">
        <h3>Additional Details</h3>
        <p>Nickname: {user.nickname}</p>
        <p>(more information can be put in here as desired)</p>
      </div>
    </div>
    // <div className="profile-page">
    //     <h2>Hello, Davis</h2>
    //     <img src="https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg" alt="Not found" />
    //     <h3>Name: Davis Williams</h3>
    //     <h4>Email: thisisatestemail@gmail.com</h4>

    //     <div className="profile-details">
    //         <h3>Additional Details</h3>
    //         <p>Nickname: {user.nickname}</p>
    //         <p>(more information can be put in here as desired)</p>
    //     </div>
    // </div>
  );
};

export default ProfilePage;
