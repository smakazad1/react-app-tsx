import { useState } from "react";
import { styled, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";

const StyledTable = styled(Table)`
    margin-top: 20px;
    & > thead th {
        font-weight: 600;
        color: #333996;
        background-color: #3c44b126;
    };
    & > tbody td {
        font-weight: 300;
    };
    & tbody tr:hover {
        background-color: #fffbf2;
        cursor: pointer;
    }
`;

export default function useTable(records: any, headCells: any, filterFn: any) {

    const pages = [5, 10, 25];
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(pages[page]);
    const [order, setOrder] = useState<string>();
    const [orderBy, setOrderBy] = useState<number>();

    const TblContainer = (props: any) => (
        <StyledTable>
            {props.children}
        </StyledTable>
    );

    const TblHead = (props: any) => {

        const handleShortRequest = (cellId: any) => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(cellId);
        }
        return (<TableHead>
            <TableRow>
                {
                    headCells.map((headCell: any) => (
                        <TableCell key={headCell.id}>
                                {headCell.disableSorting ? headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    onClick={() => { handleShortRequest(headCell.id) }}>
                                    {headCell.label}
                                </TableSortLabel>}
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
        );
    }

    const handlePageChange = (event: any, newPage: any) => {
        setPage(newPage);
    }

    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const TblPagination = () => (<TablePagination
        component = "div"
        page = {page}
        rowsPerPageOptions = {pages}
        rowsPerPage = {rowsPerPage}
        count = {records.length}
        onPageChange = {handlePageChange}
        onRowsPerPageChange = {handleRowsPerPageChange}
    />);

    function stableSort(array: any, comparator: any) {
        const stabilizedThis = array.map((el: any, index: any) => [el, index]);
        stabilizedThis.sort((a: any, b: any) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el: any) => el[0]);
    }

    function getComparator(order: any, orderBy: any) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a: any, b: any, orderBy: any) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndShorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndShorting
    }
}