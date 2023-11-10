import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import LoadingGif from "../misc/loadingGif";
import { BsPatchExclamation } from "react-icons/bs";
/**
 * @author Isac Zetterström
 * @description renders card for userinformation
 */

function UserInfoCard({ setEditUser }) {
  const { loading, err, data } = useFetchData("/profile/user");
  return (
    <>
      {(!data?.phone || !data?.firstName || !data?.lastName) && (
        <Row className="note-card mx-auto p-2 my-4">
          <Col className="d-flex flex-column align-items-center profile-note">
            <BsPatchExclamation className="note-icon" />
            <h6>Psst,</h6>
            <p className="text-center mt-1 note-whisper">
              Visste du att du får ta del av medlemserbjudanden om du fyller i dina uppgifter?
            </p>
            <Button
              className="p-1"
              onClick={() => {
                setEditUser(true);
              }}
            >
              Lägg till mina uppgifter
            </Button>
          </Col>
        </Row>
      )}
      {(loading && <LoadingGif />) || (err && <p>Gick inte att hämta dina uppgifter</p>) || (
        <Row className="user-info-card mx-auto my-4 p-3">
          <h6 className="line p-0">Dina uppgifter</h6>
          <table className="d-flex profile-row p-0">
            <thead>
              <tr className="d-flex flex-column">
                <th>Email:</th>
                <th>Telefon:</th>
                <th>Förnamn:</th>
                <th>Efternamn:</th>
              </tr>
            </thead>
            <tbody>
              <tr className="d-flex flex-column">
                <td className="text-truncate text-nowrap">{data.email}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.phone ? "Uppgift saknas" : data.phone}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.firstName ? "Uppgift saknas" : data.firstName}</td>
              </tr>
              <tr className="d-flex flex-column">
                <td>{!data.lastName ? "Uppgift saknas" : data.lastName}</td>
              </tr>
            </tbody>
          </table>

          <Button
            className="profile-btn"
            onClick={() => {
              setEditUser(true);
            }}
          >
            Redigera
          </Button>
        </Row>
      )}
    </>
  );
}

export default UserInfoCard;
