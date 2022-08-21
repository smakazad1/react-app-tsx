import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { InputAdornment, Paper, styled, TableBody, TableCell, TableRow, Toolbar } from "@mui/material";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { Search } from "@mui/icons-material";

const StyledPaper = styled(Paper)`
    margin: 40px 0 0 0;
    padding: 24px 24px 24px 24px;
`;

const RefreshButton = styled(Controls.Button)`
    position: absolute;
    left: 10px;
`;

const SearchInput = styled(Controls.Input)`
    width: 80%;
    position: absolute;
    right: 25px;
`;

const headCells = [
    { id: "id", label: "Id" },    
    { id: "name", label: "Name" },
    { id: "username", label: "User Name" },
    { id: "website", label: "Website" },
    { id: "company.name", label: "Company Name" }
];

const User = (props: any) => {
    const { fetchAllUsers } = props;

    const records = props.userList.map((x: any) =>({...x}));
    const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return items } });

    const [users, setUsers] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const ref: React.MutableRefObject<any> = useRef();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        setTimeout(() => {
          ref.current.click();
        }, 500);
    }, []);
  
    const timerfunc = () => {
        let name: string = "";
        for (let i: number = 0; i < users.length; i++) {
            name = users[i][1];
            if (name !== "") break;
        }
        if (name !== "")
            setLoading(false);
    };

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndShorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = (e: any) => {
        let target = e.target
        setFilterFn ({
            fn:items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter((x: any) => x.name.toLowerCase().includes(target.value) ? x.name.toLowerCase().includes(target.value) : x.username.toLowerCase().includes(target.value));
            }
        });
    };

    return (
        <>
            <StyledPaper elevation={4}>
                <Toolbar>
                    <h1 style={{ margin: "0 auto", alignSelf: "center"}}><ViewComfyIcon /> Users List</h1>
                </Toolbar>
                <Toolbar>
                    <RefreshButton
                        text = "Refresh"
                        variant = "outlined"
                        onClick ={() => {
                            setInterval("location.reload()", 500);
                        }}
                    />
                    <SearchInput
                        label="Search User"
                        InputProps = {{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {loading
                            ?
                            <TableRow ref={ref} onClick={timerfunc}>
                                <TableCell>Loading...</TableCell>
                            </TableRow>
                            :
                            recordsAfterPagingAndShorting().map((item: any) => (
                                <TableRow key={item.id} hover>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell><a href={`${"http://"}${item.website}`} rel="noreferrer" target="_blank">{item.website}</a></TableCell>
                                    <TableCell>{item.company.name}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </StyledPaper>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    userList: state.user.list
})

const mapActionToProps = {
    fetchAllUsers: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(User);