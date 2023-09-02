import Image from 'next/image'
import searchIcon from '@/components/icons/searchIcon.svg'

export default function InputForm ({ city, setCity, handleSearch, handleKeyDown }) {
  return (
    <form className='flex items-center p-2 w-full md:w-auto' onSubmit={handleSearch}>
      <div className='relative w-full'>
        <input
          className='w-full md:text-xl text border rounded-full pl-4 p-2 pr-12 text-indigo-800 bg-transparent focus:outline-none placeholder-indigo-800 placeholder-opacity-80'
          type='text'
          placeholder='Search for a city...'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
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
