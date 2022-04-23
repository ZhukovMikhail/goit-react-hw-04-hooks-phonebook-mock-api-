import './App.styled.jsx';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Container } from 'App.styled';
import { MyForm } from 'components/Form/Form.jsx';
import { Contacts } from 'components/Contacts/Contacts.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
// import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ApiService from './services/api';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addcontact, setAddContact] = useState(null);
  const [filter, setFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const ref = useRef(1);

  useEffect(() => {
    console.log('useEffect get');
    ref.current += 1;
    console.log(ref.current);
    ApiService.getContacts().then(r => setContacts(r));
  }, []);
  // ================Так почемуто не работает!!!!=========================
  // useEffect(() => {
  //   console.log('useEffect create');
  //   ApiService.createContact(addcontact).then(resp => console.log(resp));
  // }, [addcontact]);
  // App.js:20 useEffect get
  // App.js:25 useEffect create
  // App.js:32 useEffect delete
  // App.js:20 useEffect get
  // App.js:25 useEffect create
  // App.js:32 useEffect delete

  // =======================================================================

  useEffect(() => {
    console.log('useEffect delete');
    console.log(ref.current);

    ApiService.deleteContact(deleteId).then(r => console.log(r));

    setTimeout(() => ApiService.getContacts().then(r => setContacts(r)), 600);
  }, [deleteId]);

  const notify = () =>
    toast.warn('That NAME or NUMBER already exist', {
      position: toast.POSITION.TOP_CENTER,
    });
  const isContactDubled = (arr, data, key) => {
    return arr.some(
      contact =>
        contact[key].toLocaleLowerCase() === data[key].toLocaleLowerCase(),
    );
  };
  const onFormSubmit = data => {
    if (
      isContactDubled(contacts, data, 'name') ||
      isContactDubled(contacts, data, 'number')
    ) {
      notify();
      return;
    }
    setAddContact(data);
    setTimeout(() => ApiService.getContacts().then(r => setContacts(r)), 600);
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
  return (
    <Container>
      <h1>Phonebook</h1>
      <MyForm
        onSubmit={onFormSubmit}
        contacts={contacts}
        isContDubled={isContactDubled}
      ></MyForm>
      <ToastContainer />
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
