import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RecipeeCard from '../components/RecipeeCard'
import { getRandomColor } from '../libs/utils';


const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;
const HomePage = () => {
  const [recipee,setRecipees] = useState([]);
  const [loading,setLoading]=useState(false);

  const fetchRecipees = async (searchQuery)=>{
    setLoading(true);
    setRecipees([]);
    try {
      const res =await fetch(`https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`);
      const data = await res.json();
      setRecipees(data.hits)
    } catch (error) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchRecipees('chicken');
  },[]);

  const handleSearchRecipe = (e) => {
		e.preventDefault();
		fetchRecipees(e.target[0].value);
	};
  return (
    <div  className='flex bg-[#faf9fb] flex-1 p-10' >
      <div className='max-w-screen-lg mx-auto' >
        <form onSubmit={handleSearchRecipe} >
          <label className='input shadow-md flex items-center gap-2'  >
            <Search size={'24'} />
            <input type="text"  className='text-sm md:text-md grow'  placeholder='What do you want to cook' />
            </label>
          
        </form>
        <h1 className="font-bold text-3xl md:text-5xl mt-4">Recomended Recipes</h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">Popular choices</p>

        <div  className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >


        {!loading &&
						recipee.map(({ recipe }, index) => (
							<RecipeeCard key={index} recipe={recipe} {...getRandomColor()} />
						))}
          {loading &&
						[...Array(9)].map((_, index) => (
							<div key={index} className='flex flex-col gap-4 w-full'>
								<div className='skeleton h-32 w-full'></div>
								<div className='flex justify-between'>
									<div className='skeleton h-4 w-28'></div>
									<div className='skeleton h-4 w-24'></div>
								</div>
								<div className='skeleton h-4 w-1/2'></div>
							</div>
						))}
         
        </div>
      </div>
    </div>
  )
}

export default HomePage