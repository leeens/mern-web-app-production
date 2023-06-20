import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import { useState, useMemo } from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';

function SearchContainer() {
    const [localSearch, setLocalSearch] = useState('');

    const {
        isLoading,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        handleChange,
        clearFilters,
        jobTypeOptions,
        statusOptions
    } = useAppContext();

    const handleSearch = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalSearch('');
        clearFilters();
    }

    const debounce = () => {
        let timeOutID;
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeOutID);
            timeOutID = setTimeout(() => {
                handleChange({ name: e.target.name, value: e.target.value });
            }, 1000)
        }
    };

    const optimizedDebounce = useMemo(
        () => debounce(),
        // eslint-disable-next-line 
        []);

    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                <div className="form-center">
                    <FormRow type="text" name="search" value={localSearch} handleChange={optimizedDebounce} />
                    <FormRowSelect labelText="type" name='searchType' value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]} />
                    <FormRowSelect labelText="status" name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]} />
                    <FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions} disabled={isLoading} onClick={handleSubmit} />
                    <button className='btn btn-block btn-danger'>clear filters</button>
                </div>
            </form>
        </Wrapper>
    );
};


export default SearchContainer;