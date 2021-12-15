import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from "react-data-table-component";


const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const history = () => {
    return (
        <DataTable
            columns={columns}
            data={data}
            selectableRows
        />
    );
}

export default history;