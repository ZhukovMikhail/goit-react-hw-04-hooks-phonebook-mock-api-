import './App.styled.jsx';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Container } from 'App.styled';
import { MyForm } from 'components/Form/Form.jsx';
import { Contacts } from 'components/Contacts/Contacts.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
// import { v4 as uuidv4 } from 'uuid';

import * as ApiService from './services/api';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addcontact, setAddContact] = useState(null);
  const [filter, setFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const ref = useRef(0);

  useEffect(() => {
    console.log('useEffect get', 'ref.current:', ref.current);
    ApiService.getContacts().then(r => setContacts(r));
  }, []);

  useEffect(() => {
    if (ref.current < 2) {
      return;
    }
    console.log('useEffect create', 'ref.current:', ref.current);
    ApiService.createContact(addcontact).then(resp => console.log(resp));
    setTimeout(() => ApiService.getContacts().then(r => setContacts(r)), 600);
  }, [addcontact]);

  useEffect(() => {
    if (ref.current < 2) {
      return;
    }
    console.log('useEffect delete', 'ref.current:', ref.current);
    ApiService.deleteContact(deleteId).then(r => console.log(r));

    setTimeout(() => ApiService.getContacts().then(r => setContacts(r)), 600);
  }, [deleteId]);

  const isContactDubled = (arr, data, key) => {
    return arr.some(
      contact =>
        contact[key].toLocaleLowerCase() === data[key].toLocaleLowerCase(),
    );
  };

  const filterHendle = data => {
    setFilter(data);
  };

  const handleDelete = e => {
    setDeleteId(e.currentTarget.parentElement.id);
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase());
  });

  ref.current += 1;

  return (
    <Container>
      <h1>Phonebook</h1>
      <MyForm
        onSubmit={setAddContact}
        contacts={contacts}
        isContDubled={isContactDubled}
      ></MyForm>

      <h2>Contacts:</h2>
      <Filter onFilter={filterHendle}></Filter>
      <Contacts
        contacts={filter !== '' ? filteredContacts : contacts}
        onDelete={handleDelete}
      ></Contacts>
    </Container>
  );
};

export default App;

App.propTypes = {
  data: PropTypes.object,
};
