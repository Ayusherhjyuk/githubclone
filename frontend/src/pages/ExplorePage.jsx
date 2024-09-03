import { useState } from "react";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";

const ExplorePage = () => {

    const [loading,setloading]=useState(false);
	const [repos,setrepos]=useState([]);
	const [selectedlang,setselectedlang]=useState('');

	const explorerepos = async (language)=>{
			setloading(true);
			setrepos([]);
		try {
			const res=await fetch(`/api/explore/repos/${language}`);
			const {repos}=await res.json();
			setrepos(repos);
			setselectedlang(language);
		} catch (error) {
			toast.error(error.message);
		}
		finally{
			setloading(false);
		}
	}
	return (
		<div className='px-4'>
			<div className='bg-glass max-w-2xl mx-auto rounded-md p-4'>
				<h1 className='text-xl font-bold text-center'>Explore Popular Repositories</h1>
				<div className='flex flex-wrap gap-2 my-2 justify-center'>
					<img src='/javascript.svg' alt='JavaScript' className='h-11 sm:h-20 cursor-pointer' 
					onClick={()=> explorerepos("javascript")}/>
					<img src='/typescript.svg' alt='TypeScript logo' className='h-11 sm:h-20 cursor-pointer' 
					onClick={()=> explorerepos("typescript")} />
					<img src='/c++.svg' alt='C++ logo' className='h-11 sm:h-20 cursor-pointer'
					onClick={()=> explorerepos("c++")} />
					<img src='/python.svg' alt='Python logo' className='h-11 sm:h-20 cursor-pointer' 
					onClick={()=> explorerepos("Python")}/>
					<img src='/java.svg' alt='Java logo' className='h-11 sm:h-20 cursor-pointer'
					onClick={()=> explorerepos("java")} />
				</div>
				{repos.length > 0 && (
					<h2 className='text-lg font-semibold text-center my-4'>
						<span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
							{selectedlang.toUpperCase()}{" "}
						</span>
						Repositories
					</h2>
				)}
				{!loading && repos.length > 0 && <Repos repos={repos} alwaysFullWidth />}
				{loading && <Spinner />}
			</div>
		</div>
	);
};

export default ExplorePage;