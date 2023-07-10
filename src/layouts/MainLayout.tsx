import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Container } from "@mantine/core";

const MainLayout = () => {
  const user = {
    "name": "Jane Spoonfighter",
    "email": "janspoon@fighter.dev",
    "image":
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  };

  const tabs = [
    "Dashboard",
    // "Orders",
    // "Education",
    // "Community",
    // "Forums",
    // "Support",
    // "Account",
    // "Helpdesk",
  ];

  return (
    <>
      <Navbar user={user} tabs={tabs} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
