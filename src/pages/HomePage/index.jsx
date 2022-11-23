import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddContact from "../../components/AddContact/AddContact";
import { getContacts } from "../../store/slices/contactsSlice";
import Grid from "@mui/material/Unstable_Grid2";
import EditContact from "../../components/EditContact/EditContact";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import "./style.scss";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const contacts = useSelector((state) => state.contacts.contacts);

  const [updateContacts, setUpdateContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) || contacts
  );

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    setUpdateContacts(JSON.parse(localStorage.getItem("contacts")) || contacts);
  }, [contacts]);

  const addCreateContact = (contact) => {
    const temp = [...updateContacts];
    temp.push(contact);
    setUpdateContacts(
      temp,
      localStorage.setItem("contacts", JSON.stringify(temp))
    );
    handleHideForm();
    dispatch(getContacts(temp));
  };

  const deleteContact = (index) => {
    const temp = [...updateContacts];
    temp.splice(index, 1);
    setUpdateContacts(
      temp,
      localStorage.setItem("contacts", JSON.stringify(temp))
    );
  };

  const handleShowForm = () => setShowAddForm(true);
  const handleHideForm = () => setShowAddForm(false);

  const handleEditShowForm = () => setShowEditForm(true);
  const handleEditHideForm = () => setShowEditForm(false);

  const handleSelectedContact = (contact) => setSelectedContact(contact);

  const editForm = (item, index) => {
    handleSelectedContact(item, index);
    handleEditShowForm();
  };
  const editContact = (contact) => {
    const arrayCopy = [...updateContacts];
    const index = arrayCopy.indexOf(selectedContact);
    if (index !== -1) {
      arrayCopy[index] = contact;
      setUpdateContacts(
        arrayCopy,
        localStorage.setItem("contacts", JSON.stringify(arrayCopy))
      );
      handleEditHideForm();
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape" && showAddForm) {
        handleHideForm();
        window.removeEventListener("keyup", handleHideForm);
      }
    });
  });

  return (
    <div>
      {showAddForm && (
        <AddContact
          updateContacts={updateContacts}
          handleHideForm={handleHideForm}
          addCreateContact={addCreateContact}
        />
      )}
      {showEditForm && (
        <EditContact
          handleEditHideForm={handleEditHideForm}
          handleSelectContact={handleSelectedContact}
          selectedContact={selectedContact}
          editContact={editContact}
          updateContacts={updateContacts}
        />
      )}

      <div>
        <h1 className="contact-title">Контакты</h1>
        <div className="contact-button-wrapper">
          <button onClick={handleShowForm} className="contact-button">
            Добавить контакт
          </button>
        </div>
        <Box sx={{ flexGrow: 1, fontFamily: "Nunito" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {updateContacts.length > 0 ? (
              updateContacts.map((item, index) => (
                <Grid item xs={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ fontFamily: "Nunito, sans-serif" }}>
                      <Typography variant="h6" component="h3">
                        {item.name}
                      </Typography>
                      <Typography variant="body1">{item.phone}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Button variant="text" onClick={() => editForm(item)}>
                        Редактировать
                      </Button>
                      <Button variant="text" href={`tel:${item.phone}`}>Позвонить</Button>
                      <Button
                        variant="text"
                        onClick={() => deleteContact(index)}
                      >
                        Удалить
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <div></div>
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
