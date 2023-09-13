import Image from 'next/image'
import { useState } from 'react'
import searchIcon from '@/components/icons/searchIcon.svg'
import PlacesAutocomplete from 'react-places-autocomplete'

export default function InputForm ({ setCity, handleSearch, fetchWeather }) {
  const [input, setInput] = useState('')

  return (
    <form className='flex items-center p-2 w-full md:w-auto' onSubmit={handleSearch}>
      <div className='relative w-full'>
        <PlacesAutocomplete
          value={input}
          onChange={setInput}
          onSelect={(selectedCity) => {
            setCity(selectedCity)
            fetchWeather(selectedCity)
          }}
          googleCallbackName='initOne'
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className='relative w-full'>
              <input
                {...getInputProps({
                  placeholder: 'Search for a city...',
                  className: 'w-full md:text-xl text border rounded-full pl-4 p-2 pr-12 text-indigo-800 bg-transparent focus:outline-none placeholder-indigo-800 placeholder-opacity-80',
                  type: 'text',
                  autoFocus: true
                })}
              />
              <div className='absolute z-10 w-full bg-white rounded-b-lg border-t-0'>
                {loading && ''}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#ebebeb' : '#fff',
                    cursor: 'pointer',
                    padding: '0.5rem'
                  }
                  return (
                    <div key={suggestion.placeId} className='rounded-b-lg' style={style} {...getSuggestionItemProps(suggestion)}>
                      {suggestion.description}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Image
          priority
          src={searchIcon}
          height={32}
          width={32}
          alt='search icon'
          className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
          onClick={handleSearch}
        />
      </div>
    </form>
  )
}
