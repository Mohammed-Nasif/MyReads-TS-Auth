// Components
import { HomeNav } from '../components/HomeNav';
import { ShelvesWrapper } from '../components/ShelvesWrapper';
import { SearchButton } from '../components/SearchButton';

// Hooks
import { useContext } from 'react';

// Contexts
import { UserBooksContext } from '../contexts/UserBooksContext';

// Types And Interfaces
import { UserBooksContextType } from '../@types/types';
import { Shelf } from '../@types/interfaces';

export const Home = (): JSX.Element => {
	const homeShelves: Shelf[] = [
		{ id: 0, name: 'Currently Reading', identifier: 'currentlyReading' },
		{ id: 1, name: 'Want to Read', identifier: 'wantToRead' },
		{ id: 2, name: 'Read', identifier: 'read' },
	];

	// Use User Current Books from the userBookscontext
	const { shelvesUserBooks } = useContext(UserBooksContext) as UserBooksContextType;

	return (
		<div className='list-books'>
			<HomeNav />
			<ShelvesWrapper shelves={homeShelves} shelvesBooks={shelvesUserBooks} />
			<SearchButton />
		</div>
	);
};
