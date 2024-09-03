const SortRepos = ({onsort,sortType}) => {
	return (
		<div className='mb-2 flex justify-center lg:justify-end'>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass ${sortType==="recent" ? "border-b-blue-600":" "}`}
			    
				onClick={()=> onsort("recent")}
			>
				Most Recent
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass ${sortType==="stars" ? "border-b-blue-600":" "}`}
			onClick={()=> onsort("stars")}
			>
				Most Stars
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass ${sortType==="forks" ? "border-b-blue-600":" "}`}
			onClick={()=> onsort("forks")}
			>
				Most Forks
			</button>
		</div>
	);
};

export default SortRepos