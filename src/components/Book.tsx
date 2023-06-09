// Hooks and Utilities
import { FC, FormEvent, useContext } from 'react';

// React Router
import { Link } from 'react-router-dom';

// API Functions
import { updateBookShelf } from '../apis/books/updateBookShelf';

// Contexts
import { UserBooksContext } from '../contexts/UserBooksContext';

// Types and Interfaces
import { UserBooksContextType } from '../@types/types';
import { Book as BookInterface } from '../@types/interfaces';

// React-Toastify
import { toast } from 'react-toastify';

export const Book: FC<{
	book: BookInterface;
}> = ({ book }): JSX.Element => {
	
	// The UpdateFlag to  reFetch All user Books in Home after update
	const { setUpdateFlag, updateFlag } = useContext(UserBooksContext) as UserBooksContextType;

	// PlaceHolder For Books with no Thumbnail
	const bookPlaceholder: string = 'https://placehold.co/128x193?text=No+Cover+Available';

	const updateBookShelfHandler = async (e: FormEvent<HTMLSelectElement>): Promise<void> => {

		const selectedShelfValue: string = e.currentTarget.value;

		// Call The Update Fn from API
		await updateBookShelf(book, selectedShelfValue);

		// Mainpulate The Update Flag To Affect The useEffect in UserBooksContext to Refetch Home Data
		setUpdateFlag(!updateFlag);

		// Notify The User that book category changed
		toast.success('Category changed', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	return (
		<div className='book'>
			<div className='book-top'>
				<Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
					<div
						className='book-cover'
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${book?.imageLinks?.thumbnail || bookPlaceholder})`,
						}}
					/>
				</Link>
				<div className='book-shelf-changer'>
					<select value={book.shelf} onChange={updateBookShelfHandler}>
						<option value='move' disabled>
							Move to...
						</option>
						<option value='currentlyReading'>Currently Reading</option>
						<option value='wantToRead'>Want to Read</option>
						<option value='read'>Read</option>
						<option value='none'>None</option>
					</select>
				</div>
			</div>
			<Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
				<div className='book-title'>{book.title.slice(0, 25)}</div>
				<div className='book-authors'>
					{book.authors !== undefined
						? book.authors.map((author: string) =>
								book.authors[book.authors.length - 1] === author ? <span key={author}>{author}</span> : <span key={author}>{author}, </span>,
						  )
						: 'No Authors Avaliable'}
				</div>
				<div className='book-authors'>
					<p style={{ margin: '0px', opacity: '0.7' }}>{book.shelf}</p>
				</div>
			</Link>
		</div>
	);
};
