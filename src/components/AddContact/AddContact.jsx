import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

import "./style.scss";

const AddContact = ({ handleHideForm, addCreateContact, updateContacts }) => {
  const [contactTitle, setContactTitle] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const dispatch = useDispatch();

  const createContact = () => {
    let contact = {
      id: updateContacts.length + 1,
      name: contactTitle,
      phone: contactNumber,
    };
    if (contact.name && contact.phone) {
      addCreateContact(contact);
      dispatch(setUser(contact));
    }
  };

  return (
    <>
      <form className="add_contact-form" onSubmit={createContact}>
        <h2>Создание контакта</h2>
        <div>
          <input
            type="text"
            name="contact-title"
            onChange={(e) => setContactTitle(e.target.value)}
            value={contactTitle}
            placeholder="Имя"
            required
          />
        </div>
        <div>
          <input
            type="phone"
            name="contact-phone"
            onChange={(e) => setContactNumber(e.target.value)}
            value={contactNumber}
            placeholder="Номер телефона"
            required
          />
        </div>
        <div>
          <button className="form-btn" type="submit">
            Добавить контакт
          </button>
        </div>
      </form>
      <div className="overlay" onClick={handleHideForm}></div>
    </>
  );
};

export default AddContact;
