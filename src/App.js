
import './App.css';
import { useState } from 'react';
import Table from './table';

function App() {
  const [user, setUser] = useState({ fname: "", lname: "", age: "" })
  const [userData, setUserdata] = useState([])
  const [editIndex, setEditIndex] = useState(-1);
  console.log(user);

  const handelSubmit = () => {
    if (editIndex === -1) {
      setUserdata([...userData, user])

    }
    else {
      // Update existing recordsssfer
      const updatedData = [...userData];
      updatedData[editIndex] = user;
      setUserdata(updatedData);
      setEditIndex(-1);
    }
    setUser({ fname: "", lname: "", age: "" });
  }
  const handelOnchange = (e) => {

    console.log(e.target.name);


    setUser({ ...user, [e.target.name]: e.target.value })
  }
  console.log(userData);

  // lifting state up  = child to parent 
  // props = parent to child 


  const handleDelete = (index) => {
    const filters = userData?.filter((item, idx) => { return (idx !== index) })
    setUserdata(filters)
  }

  const handleEdit = (index) => {
    const selectedUser = userData[index];
    setUser(selectedUser);
    setEditIndex(index);
  };
  return (

    <>
      Enter a Username : <input type='text' name='fname' onChange={handelOnchange} value={user.fname} required></input><br /><br />
      Enter a Password : <input type='text' name='lname' onChange={handelOnchange} value={user.lname} required></input><br /><br />
      Enter a Age :<input type='number' name='age' onChange={handelOnchange} value={user.age} required></input> <br />
      <button onClick={handelSubmit}>Submit</button>

      <Table data={userData} deleterdata={handleDelete} editData={handleEdit}></Table>
    </>
  );
}

export default App;
