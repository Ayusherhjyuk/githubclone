
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast"


const HomePage = () => {
	const [userProfile,setUserProfile]=useState(null);
	const [repos,setRepos]=useState([]);
	const [loading,setLoading]=useState(false);
	const [sortType,setSortType]=useState("recent");



    const getUserProfileAndRepos = useCallback(async(username="Ayusherhjyuk")=>{
		setLoading(true);
		try {
			
			const res=await fetch(`/api/users/profile/${username}`);
			const {userProfile,repos}=await res.json();
			   repos.sort((a,b)=> new Date(b.created_at)-new Date(a.created_at));
			   setRepos(repos);
			   setUserProfile(userProfile);

			return {userProfile,repos};

			// console.log(userProfile);
			// console.log(repos);
			
		} catch (error) {
			toast.error(error.message);
		}
		finally{
			setLoading(false);
		}
	},[])
	useEffect(()=>{
      getUserProfileAndRepos();
	},[getUserProfileAndRepos]);

   const onsearch = async(e,username)=>{
   e.preventDefault();
   setLoading(true);
   setRepos([]);
   setUserProfile(null);

   const { userProfile, repos}=await getUserProfileAndRepos(username);

   setUserProfile(userProfile);
   setRepos(repos);
   setLoading(false);
   setSortType("recent");
   
   }

   const onsort =(sortType)=>{
	if(sortType==="recent"){
		repos.sort((a,b)=> new Date(b.created_at)-new Date(a.created_at));
	}
	else if(sortType==="stars"){
			repos.sort((a,b)=> b.stargazers_count - a.stargazers_count  );
	}
	else if(sortType==="forks"){
             repos.sort((a,b)=> b.forks_count - a.forks_count  );
	}	
	setSortType(sortType);
	setRepos([...repos]);
   }


	return (
		<div className='m-4'>
			<Search  onsearch={onsearch}/> 
			{repos.length > 0 && <SortRepos onsort={onsort} sortType={sortType}/>}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
			{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
				{repos.length > 0 && !loading && <Repos repos={repos}/>}

				{loading && <Spinner/>}
			</div>
		</div>
	);
};

export default HomePage