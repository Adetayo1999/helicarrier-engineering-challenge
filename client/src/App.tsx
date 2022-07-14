import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const TRANSACTION = gql`
  query ExampleQuery {
    transactions {
      id
      date
      status
      type
    }
  }
`;

function App() {
  const [typeFilter, setTypeFilter] = useState("");
  const [results, setResults] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const { data, loading, error } = useQuery(TRANSACTION);

  useEffect(() => {
    if (!loading && data && data?.transactions) {
      const groups = data?.transactions
        .filter((item: any) => {
          return Object.keys(item).some((key) => {
            return key === "id"
              ? false
              : item[key]
                  .toString()
                  .toLowerCase()
                  .includes(searchText.toLowerCase().trim());
          });
        })
        .filter((item: any) => {
          if (statusFilter && typeFilter)
            return item.type === typeFilter && item.status === statusFilter;
          else if (statusFilter) {
            return item.status === statusFilter;
          } else if (typeFilter) return item.type === typeFilter;
          else return item;
        })
        .reduce((groups: any, game: any) => {
          const date = game.date;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(game);
          return groups;
        }, {});

      const groupArrays: any = Object.keys(groups).map((date) => {
        return {
          date,
          games: groups[date],
        };
      });
      setResults(groupArrays);
    }
  }, [statusFilter, typeFilter, loading, searchText]);

  if (loading) return <p className='text-center'>Loading...</p>;

  if (error) {
    return (
      <div className='flex justify-center items-center'>
        <p className='text-red-500 text-lg'>
          Something went wrong, ensure you have a connection
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen  p-5'>
      <div className='w-full md:w-[50%] mx-auto'>
        {/* Search Bar */}
        <div className='mx-auto h-[3rem] mb-5'>
          <input
            type='search'
            name=''
            id=''
            placeholder='Enter Something here...'
            className='w-full h-full px-4 py-2 outline-none transition duration-150 focus:ring-4 focus:ring-green-300 rounded-md focus:ring-opacity-30 border border-gray-200'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {/* Filters */}
        <div className='mb-4'>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
            className='px-3 py-2 rounded-sm mr-4 outline-none transition duration-150 focus:ring-4 focus:ring-green-300  focus:ring-opacity-30 border border-gray-200'
          >
            <option value=''>status</option>
            <option value='pending'>pending</option>
            <option value='active'>active</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
            }}
            className='px-3 py-2 rounded-sm mr-4 outline-none transition duration-150 focus:ring-4 focus:ring-green-300  focus:ring-opacity-30 border border-gray-200'
          >
            <option value=''>type</option>
            <option value='debit'>debit</option>
            <option value='credit'>credit</option>
          </select>
        </div>
        {/* Results Display */}
        {results?.length === 0 ? (
          <p>No Items</p>
        ) : (
          results.map((item: any, index: any) => (
            <DateComponent date={item?.date} data={item?.games} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

const DateComponent = ({ date, data }: any) => {
  return (
    <div className='mb-4'>
      <h1 className='p-3 rounded-md bg-green-300 text-gray-50 mb-3 font-bold'>
        {date}
      </h1>
      {data?.map((item: any) => (
        <div key={item.id} className='mb-4 flex'>
          <div className='w-[5rem] h-[5rem] rounded-md  bg-gray-200 mr-4 overflow-hidden'>
            <img
              src='https://picsum.photos/200'
              alt='some image'
              className='w-full h-full object-contain '
            />
          </div>
          <div className=''>
            <p>Type: {item.type}</p>
            <p
              className={`my-2 px-3 w-[5rem] flex justify-center items-center text-sm rounded-full ${
                item.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {item.status}
            </p>
            <small>{item.date}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
