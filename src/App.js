import './App.styled.jsx';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Container } from 'App.styled';
import { MyForm } from 'components/Form/Form.jsx';
import { Contacts } from 'components/Contacts/Contacts.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const derivedContact = JSON.parse(localStorage.getItem('contacts'));

const App = () => {
  const [contacts, setContacts] = useState(
    () => derivedContact ?? defaultContacts,
  );
  const [filter, setFilter] = useState('');

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
    setContacts(prevState => [...prevState, { id: uuidv4(), ...data }]);
  };
  const filterHendle = data => {
    setFilter(data);
  };
  const handleDelete = e => {
    const chengedContacts = contacts.filter(
      contact => contact.id !== e.currentTarget.parentElement.id,
    );
    setContacts(chengedContacts);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
