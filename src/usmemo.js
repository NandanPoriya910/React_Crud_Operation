import Table from './table';
import { useState, useEffect, useMemo, useCallback } from 'react';

export function TestUseMemo() {

    // -- State -- //
    const [user, setUser] = useState({ fname: "", lname: "", age: "" });
    const [userData, setUserdata] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [errors, setErrors] = useState({});


    // Sorting & Searching States
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchField, setSearchField] = useState("");
    const [searchText, setSearchText] = useState("");

    // -- useEffects -- //
    useEffect(() => {
        console.log("User list updated");
    }, [userData]);


    //-- Functions -- //

    const handelOnchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handelSubmit = () => {

        if (!validate()) {
            return; // Stop if validation fails
        }

        if (editIndex === -1) {
            setUserdata([...userData, user]);
        } else {
            const updated = [...userData];
            updated[editIndex] = user;
            setUserdata(updated);
            setEditIndex(-1);
        }

        setUser({ fname: "", lname: "", age: "" });
    };

    // validation
    const validate = () => {
        let tempErrors = {};
        let isValid = true;
        const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;


        if (!user.fname.trim()) {
            tempErrors.fname = "Name is required";
            isValid = false;
        }

        if (!strongPassword.test(user.lname)) {
            tempErrors.lname =
                "Password must be 6+ characters, contain letters, numbers, special symbols, and no spaces";
            isValid = false;
        }
        

        if (!user.age) {
            tempErrors.age = "Age is required";
            isValid = false;
        } else if (Number(user.age) < 18) {
            tempErrors.age = "Age must be above 18";
            isValid = false;
        }

        setErrors(tempErrors);

        return isValid;  
    };


    // 
    const handleDelete = (index) => {
        const filtered = userData.filter((item, idx) => idx !== index);
        setUserdata(filtered);
    };

    const handleEdit = (index) => {
        setUser(userData[index]);
        setEditIndex(index);
    };


    // -- Memo for Validation -- //
    // const getData = useMemo(() => {
    //     return user.fname ? "valid" : "invalid";
    // }, [user.fname]);


    // -- useCallback Example -- //
    const getdatafunction = useCallback((value) => {
        if (value > 2) return "red";
    }, []);


    //  Sort Function  //
    const sortDataFn = useCallback((data, field, order) => {
        if (!field) return data;

        return [...data].sort((a, b) => {
            let val1 = a[field].toString().toLowerCase();
            let val2 = b[field].toString().toLowerCase();

            if (order === "asc") return val1 > val2 ? 1 : -1;
            return val1 < val2 ? 1 : -1;
        });
    }, []);


    // Search  //
    const finalData = useMemo(() => {
        let filtered = userData;

        // Searching
        if (searchField && searchText) {
            filtered = filtered.filter((item) =>
                item[searchField].toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Sorting
        filtered = sortDataFn(filtered, sortField, sortOrder);

        return filtered;

    }, [userData, searchField, searchText, sortField, sortOrder, sortDataFn]);


  
    return (
        <>
            
            <div>
                <label>Enter Username: </label>
                <input type="text" name="fname" onChange={handelOnchange} value={user.fname} /><br />
                {errors.fname && <span style={{ color: "red" }}>{errors.fname}</span>}<br /><br />


                <label>Enter Password: </label>
                <input type="password" name="lname" onChange={handelOnchange} value={user.lname} /><br />
                {errors.lname && <span style={{ color: "red" }}>{errors.lname}</span>}<br /><br />


                <label>Enter Age: </label>
                <input type="number" name="age" onChange={handelOnchange} value={user.age} /><br />
                {errors.age && <span style={{ color: "red" }}>{errors.age}</span>}
                <br />


                <button onClick={handelSubmit}>Submit</button>
                <br /><br />
            </div>


            {/*Sort */}
            <div>
                <strong>Sorting :</strong> <br />

                <select onChange={(e) => setSortField(e.target.value)}>
                    <option value="">Select</option>
                    <option value="fname">First Name</option>
                    <option value="lname">Password</option>
                    <option value="age">Age</option>
                </select>

                <select onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                <br /><br />
            </div>


            {/* Search */}
            <div>
                <strong>Searching :</strong> <br />

                <select onChange={(e) => setSearchField(e.target.value)}>
                    <option value="">Select</option>
                    <option value="fname">First Name</option>
                    <option value="lname">Password</option>
                </select>

                <input
                    type="text"
                    placeholder="Search here..."
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <br /><br />
            </div>


           
            <Table backgroun={(idx) => getdatafunction(idx)} data={finalData} deleterdata={handleDelete}  editData={handleEdit}/>
        </>
    );
}
