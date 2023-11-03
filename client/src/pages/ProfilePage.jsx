import React, { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { Container, Row, Col } from "react-bootstrap";
import ActiveBookings from "../components/ProfilePage/ActiveBookings";
import ExpiredBookings from "../components/ProfilePage/ExpiredBookings";
import LoadingGif from "../components/misc/loadingGif";
import UserInfoCard from "../components/ProfilePage/UserInfoCard";
import EditUserPage from "../pages/EditUserPage";

/**
 * @author Isac Zetterström
 * @description Renders components for profilepage
 */

function ProfilePage() {
  const [update, setUpDate] = useState(0);
  const { loading, err, data } = useFetchData("profile/user/bookings", update);
  const [editUser, setEditUser] = useState(false);

  function toggle() {
    setEditUser((editUser) => !editUser);
  }
  return (
    <>
      {(editUser && (
        <EditUserPage {...{ setEditUser, runFunction: toggle }} />
      )) ||
        (loading && <LoadingGif />) ||
        (err && <p>Fel vid hämtning av profilsidan har inträffat</p>) || (
          <Container className="profile-container">
            <Row>
              <Col className="offset-sm-2 offset-md-3 offset-lg-3">
                <h1 className="line pb-1 my-3">Min Sida</h1>
              </Col>
            </Row>
            <Row className="d-flex flex-column flex-lg-row-reverse justify-content-lg-between">
              <Col lg={9}>
                <ActiveBookings
                  activeBookings={data?.active}
                  setUpDate={setUpDate}
                />
                <ExpiredBookings expiredBookings={data?.expired} />
              </Col>
              <Col lg={3}>
                <UserInfoCard {...{ setEditUser }} />
              </Col>
            </Row>
          </Container>
        )}
    </>
  );
}

export default ProfilePage;