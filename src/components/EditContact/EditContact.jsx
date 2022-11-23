import React, {useState, useLayoutEffect} from "react";

import "./style.scss";

const EditContact = ({ handleEditHideForm, showEditForm, selectedContact, editContact, updateContacts }) => {
  const [contactTitle, setContactTitle] = useState(selectedContact.name);
  const [contactNumber, setContactNumber] = useState(selectedContact.phone);

  useLayoutEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape" && showEditForm) {
        handleEditHideForm();
        window.removeEventListener("keyup", handleEditHideForm);
      }
    });
  });


  const saveContact = (e) => {
    e.preventDefault()
    const contact = {
        id: selectedContact.id,
        name: contactTitle, 
        phone: contactNumber
    }
    editContact(contact)
  }

  return (
    <>
      <form className="add_contact-form" onSubmit={saveContact}>
        <h2>Редактирование контакта</h2>
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
            Сохранить
          </button>
        </div>
      </form>
      <div className="overlay" onClick={handleEditHideForm}></div>
    </>
  );
};

export default EditContact;