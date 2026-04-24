export const Table = ({ data, deleterdata, editData, backgroun }) => {
    return (
        <>
            <table border={2}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Password</th>
                        <th>Age</th>
                        <th colSpan={2}>Operations</th>
                    </tr>
                </thead>

                <tbody>
                    {data?.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ background: backgroun(index) }}>
                                    {item.fname}
                                </td>

                                <td>{item.lname}</td>
                                <td>{item.age}</td>

                                <td>
                                    <button onClick={() => deleterdata(index)}>
                                        Delete
                                    </button>
                                </td>

                                <td>
                                    <button onClick={() => editData(index)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                                No Data Available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Table;
