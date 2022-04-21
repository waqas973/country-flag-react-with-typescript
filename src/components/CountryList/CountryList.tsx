import { MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { addCountryToCart } from "../../redux/actions";
import { AppState } from "../../types";
import CountryCard from "../CountryCard/CountryCard";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import _ from "lodash";
import "./countryList.scss";

//table pagination action component

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

// country list
const CountryList = () => {
  const countries = useSelector(
    ({ countryReducer }: AppState) => countryReducer.countries
  );
  // for filtered countries
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const [sortBy, setSortBy] = useState("");
  //for paginated
  const [paginatedCountries, setPaginatedCountries] = useState(countries);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isLoading = useSelector(
    ({ countryReducer }: AppState) => countryReducer.isLoading
  );
  const cart = useSelector(({ cartReducer }: AppState) => cartReducer.cart);
  //filter country by keyword
  const searchKeyword = useSelector(
    (state: AppState) => state.uiReducer.searchKeyWord
  );

  const dispatch = useDispatch();

  //handle sort
  const handleSort = (event: any) => {
    //set sort type
    setSortBy(event.target.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //updating data according to pagination
  useEffect(() => {
    const paginedC = filteredCountries.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ) as [];
    setPaginatedCountries(paginedC);
  }, [page, rowsPerPage, filteredCountries]);

  // sort by
  useEffect(() => {
    const tempSorted = _.orderBy(countries, [sortBy], ["asc"]) as [];
    setFilteredCountries(tempSorted);
  }, [sortBy]);

  //  set countries into filtered countries
  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  // set filtered countries
  useEffect(() => {
    if (searchKeyword) {
      const _tempCountries: [] = countries.filter((country: any) =>
        country.name.common.toLowerCase().includes(searchKeyword?.toLowerCase())
      ) as [];
      setFilteredCountries(_tempCountries);
    }
  }, [searchKeyword, countries]);

  return (
    <div className="country-list">
      <div className="country-list__sort">
        <p>Sort by</p>
        <Select
          labelId="sort-country-select-label"
          id="sort-country-select"
          onChange={handleSort}
          disableUnderline={true}
          defaultValue="name"
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="region">Region</MenuItem>
          <MenuItem value="population">Population</MenuItem>
        </Select>
      </div>
      <div className="country-list__cards">
        {isLoading ? (
          <h2>loading...</h2>
        ) : (
          paginatedCountries.map((country, i) => {
            return (
              <CountryCard
                flags={country.flags.svg}
                name={country.name.common}
                region={country.region}
                onClick={() => dispatch(addCountryToCart(country))}
                disabled={cart.includes(country as never)}
                key={i}
              />
            );
          })
        )}
      </div>
      <div className="country-list__pagination">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={filteredCountries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
    </div>
  );
};

export default CountryList;
