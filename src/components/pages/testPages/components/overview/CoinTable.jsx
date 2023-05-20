import { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import LoadingSpinner from '@atoms/LoadingSpinner';
import axios from 'axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const T = 1_000_000_000_000;

const ButtonContainer = styled.div`
  margin: 15px;
`;

const PercentContainer = styled.p`
  color: ${(props) =>
    props.percent < 0
      ? '#2E64FE'
      : (props.percent = 0 ? '#A4A4A4' : '#FE2E2E')};
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinTable = ({ tokenTitle }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currency, setCurrency] = useState('KRW');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchCoinData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios(
          'https://api.coinpaprika.com/v1/tickers?quotes=USD,KRW',
        );
        setData(result.data);
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchCoinData();
  }, []);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const dataSource = data.map((data) => {
    return {
      key: data.id,
      rank: data.rank,
      name: data.name,
      symbol: data.symbol,
      market_cap: data.quotes[currency].market_cap,
      volume_24h: data.quotes[currency].volume_24h,
      percent_change_1h: data.quotes[currency].percent_change_1h,
      percent_change_24h: data.quotes[currency].percent_change_24h,
      price: data.quotes[currency].price,
    };
  });

  const columns = [
    {
      id: 'rank',
      label: '#R',
      numeric: false,
      disablePadding: false,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'name',
      label: 'Coin',
      numeric: false,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'symbol',
      label: 'Symbol',
      numeric: false,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'price',
      label: 'Price',
      numeric: true,
      disablePadding: false,
      align: 'right',
      format: (value) => {
        value.toLocaleString('en-US');
        return (
          <p>
            {currency === 'KRW' ? '₩' : '$'}
            {value.toFixed(3)}
          </p>
        );
      },
    },
    {
      id: 'market_cap',
      label: 'Market Cap',
      numeric: true,
      disablePadding: false,
      align: 'right',
      format: (value) => {
        value.toLocaleString('en-US');
        return (
          <p>
            {currency === 'KRW' ? '₩' : '$'}
            {(value / T).toFixed(2)}T
          </p>
        );
      },
    },
    {
      id: 'volume_24h',
      label: 'Volume 24h',
      numeric: true,
      disablePadding: false,
      align: 'right',
      format: (value) => {
        value.toLocaleString('en-US');
        return (
          <p>
            {currency === 'KRW' ? '₩' : '$'}
            {(value / T).toFixed(2)}T
          </p>
        );
      },
    },
    {
      id: 'percent_change_1h',
      label: '1h',
      numeric: true,
      disablePadding: false,
      align: 'right',
      format: (p) => <PercentContainer percent={p}>{p}%</PercentContainer>,
    },
    {
      id: 'percent_change_24h',
      label: '24h',
      numeric: true,
      disablePadding: false,
      align: 'right',
      format: (p) => <PercentContainer percent={p}>{p}%</PercentContainer>,
    },
  ];

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  }

  if (isError) {
    return <div>Error...!</div>;
  }

  return (
    <>
      <ButtonContainer>
        <Button
          variant={currency === 'KRW' ? 'contained' : 'outlined'}
          onClick={() => setCurrency('KRW')}
        >
          원화 (KRW)
        </Button>
        <Button
          variant={currency === 'USD' ? 'contained' : 'outlined'}
          onClick={() => setCurrency('USD')}
        >
          달러 (USD)
        </Button>
      </ButtonContainer>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 2000, width: '100%' }}>
          <Table
            sx={{ minWidth: '500px' }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <TableHead>
              <TableRow>
                {columns.map((c) => (
                  <TableCell key={c.id} align={c.align}>
                    {c.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSource
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataSource.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CoinTable;
